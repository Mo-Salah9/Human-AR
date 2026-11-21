// =====================================================================
//  Build models/anatomy.glb from BodyParts3D STL meshes.
//  Usage:  node tools/build-models.mjs        (STLs cached in tools/.cache)
//
//  BodyParts3D, (c) The Database Center for Life Science,
//  licensed under CC Attribution-Share Alike 2.1 Japan.
// =====================================================================
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as THREE from 'three';
import { Document, NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { quantize, reorder } from '@gltf-transform/functions';
import { MeshoptSimplifier, MeshoptEncoder } from 'meshoptimizer';
import { MANIFEST } from './manifest.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE = path.join(__dirname, '.cache');
const OUT = path.join(__dirname, '..', 'models', 'anatomy.glb');
const BASE = 'https://raw.githubusercontent.com/Kevin-Mattheus-Moerman/BodyParts3D/main/assets/BodyParts3D_data/stl/';

await MeshoptSimplifier.ready;
await MeshoptEncoder.ready;

// ------------------------------------------------------------ STL I/O
async function ensureFile(fma) {
  const f = path.join(CACHE, `FMA${fma}.stl`);
  if (fs.existsSync(f) && fs.statSync(f).size > 84) return f;
  for (const suffix of ['', 'nsn']) {
    const res = await fetch(`${BASE}FMA${fma}${suffix}.stl`);
    if (res.ok) { fs.writeFileSync(f, Buffer.from(await res.arrayBuffer())); return f; }
  }
  throw new Error(`Cannot download FMA${fma}`);
}

// returns non-indexed Float32Array in app space: metres, Y-up, anterior = +Z, left = +X
function readSTL(file) {
  const b = fs.readFileSync(file);
  const n = b.readUInt32LE(80);
  if (84 + n * 50 !== b.length) throw new Error('Not a binary STL: ' + file);
  const out = new Float32Array(n * 9);
  let k = 0;
  for (let i = 0; i < n; i++) {
    const o = 84 + i * 50 + 12;
    for (let v = 0; v < 3; v++) {
      const x = b.readFloatLE(o + v * 12), y = b.readFloatLE(o + v * 12 + 4), z = b.readFloatLE(o + v * 12 + 8);
      out[k++] = x / 1000; out[k++] = z / 1000; out[k++] = -y / 1000;
    }
  }
  return out;
}
const concat = (arrs) => { const n = arrs.reduce((s, a) => s + a.length, 0), o = new Float32Array(n); let k = 0; for (const a of arrs) { o.set(a, k); k += a.length; } return o; };

// ------------------------------------------------------------ mesh processing
function weld(soup, eps = 1e-5) {
  const map = new Map(), pos = [], idx = new Uint32Array(soup.length / 3);
  for (let i = 0; i < soup.length / 3; i++) {
    const x = soup[i * 3], y = soup[i * 3 + 1], z = soup[i * 3 + 2];
    const key = `${Math.round(x / eps)},${Math.round(y / eps)},${Math.round(z / eps)}`;
    let id = map.get(key);
    if (id === undefined) { id = pos.length / 3; map.set(key, id); pos.push(x, y, z); }
    idx[i] = id;
  }
  // drop degenerate triangles
  const clean = [];
  for (let t = 0; t < idx.length; t += 3) {
    const a = idx[t], b = idx[t + 1], c = idx[t + 2];
    if (a !== b && b !== c && a !== c) clean.push(a, b, c);
  }
  return { positions: new Float32Array(pos), indices: new Uint32Array(clean) };
}

function simplify(mesh, targetTris) {
  let { positions, indices } = mesh;
  const tris = indices.length / 3;
  if (tris > targetTris) {
    let [res] = MeshoptSimplifier.simplify(indices, positions, 3, targetTris * 3, 0.02, ['Prune']);
    if (res.length / 3 > targetTris * 1.5) [res] = MeshoptSimplifier.simplifySloppy(indices, positions, 3, null, targetTris * 3, 0.02);
    indices = res;
  }
  // compact
  const remap = new Int32Array(positions.length / 3).fill(-1), np = [];
  const ni = new Uint32Array(indices.length);
  for (let i = 0; i < indices.length; i++) {
    const v = indices[i];
    if (remap[v] < 0) { remap[v] = np.length / 3; np.push(positions[v * 3], positions[v * 3 + 1], positions[v * 3 + 2]); }
    ni[i] = remap[v];
  }
  return { positions: new Float32Array(np), indices: ni };
}

function normals(mesh) {
  const { positions: p, indices: ix } = mesh, n = new Float32Array(p.length);
  for (let t = 0; t < ix.length; t += 3) {
    const a = ix[t] * 3, b = ix[t + 1] * 3, c = ix[t + 2] * 3;
    const ux = p[b] - p[a], uy = p[b + 1] - p[a + 1], uz = p[b + 2] - p[a + 2];
    const vx = p[c] - p[a], vy = p[c + 1] - p[a + 1], vz = p[c + 2] - p[a + 2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    for (const v of [a, b, c]) { n[v] += nx; n[v + 1] += ny; n[v + 2] += nz; }
  }
  for (let i = 0; i < n.length; i += 3) {
    const l = Math.hypot(n[i], n[i + 1], n[i + 2]) || 1; n[i] /= l; n[i + 1] /= l; n[i + 2] /= l;
  }
  return n;
}

function mergeMeshes(list) {
  let off = 0, k = 0; const P = [];
  const I = new Uint32Array(list.reduce((s, m) => s + m.indices.length, 0));
  for (const m of list) { P.push(m.positions); for (const v of m.indices) I[k++] = v + off; off += m.positions.length / 3; }
  return { positions: concat(P), indices: I };
}

// ------------------------------------------------------------ landmarks (slices of real bones)
function slices(soup, y0, y1, step) {
  const bins = [];
  for (let y = y0; y > y1; y -= step) bins.push({ y: y - step / 2, n: 0, sx: 0, sz: 0, minX: 1e9, maxX: -1e9, minZ: 1e9, maxZ: -1e9 });
  for (let i = 0; i < soup.length; i += 3) {
    const y = soup[i + 1]; const k = Math.floor((y0 - y) / step);
    if (k < 0 || k >= bins.length) continue;
    const b = bins[k], x = soup[i], z = soup[i + 2];
    b.n++; b.sx += x; b.sz += z; b.minX = Math.min(b.minX, x); b.maxX = Math.max(b.maxX, x); b.minZ = Math.min(b.minZ, z); b.maxZ = Math.max(b.maxZ, z);
  }
  return bins.filter((b) => b.n > 0).map((b) => ({ ...b, cx: b.sx / b.n, cz: b.sz / b.n }));
}
function bbox(soup) {
  const mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9];
  for (let i = 0; i < soup.length; i += 3) for (let a = 0; a < 3; a++) { mn[a] = Math.min(mn[a], soup[i + a]); mx[a] = Math.max(mx[a], soup[i + a]); }
  return { min: mn, max: mx, c: mn.map((v, a) => (v + mx[a]) / 2) };
}
function tubeMesh(points, radiusFn, tubular = 120, radial = 10) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), false, 'centripetal');
  const frames = curve.computeFrenetFrames(tubular, false);
  const pos = [], idx = [], P = new THREE.Vector3();
  for (let i = 0; i <= tubular; i++) {
    const t = i / tubular; curve.getPointAt(t, P);
    const cap = Math.sqrt(Math.min(1, Math.min(t, 1 - t) / 0.02));
    const r = radiusFn(t) * cap, N = frames.normals[i], B = frames.binormals[i];
    for (let j = 0; j < radial; j++) {
      const v = (j / radial) * Math.PI * 2, s = Math.sin(v), c = -Math.cos(v);
      pos.push(P.x + r * (c * N.x + s * B.x), P.y + r * (c * N.y + s * B.y), P.z + r * (c * N.z + s * B.z));
    }
  }
  for (let i = 0; i < tubular; i++) for (let j = 0; j < radial; j++) {
    const a = i * radial + j, b = (i + 1) * radial + j, a1 = i * radial + ((j + 1) % radial), b1 = (i + 1) * radial + ((j + 1) % radial);
    idx.push(a, b, a1, b, b1, a1);
  }
  return { positions: new Float32Array(pos), indices: new Uint32Array(idx) };
}
function ellipsoidMesh(rx, ry, rz, c, deform) {
  const g = new THREE.SphereGeometry(1, 28, 20);
  const p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); if (deform) deform(v); p.setXYZ(i, v.x * rx + c[0], v.y * ry + c[1], v.z * rz + c[2]); }
  return weld(g.toNonIndexed().attributes.position.array);
}

// ------------------------------------------------------------ build
const raw = {};          // id -> soup (for landmarks)
const parts = [];        // { id, key, side, sys, mesh }
async function loadSoup(ids) { const arr = []; for (const id of ids) arr.push(readSTL(await ensureFile(id))); return concat(arr); }

let totalTris = 0;
for (const [key, def] of Object.entries(MANIFEST)) {
  const variants = [];
  if (def.c && def.split) {
    const soup = await loadSoup(def.c);
    const L = [], R = [];
    for (let t = 0; t < soup.length; t += 9) { const cx = (soup[t] + soup[t + 3] + soup[t + 6]) / 3; (cx >= 0 ? L : R).push(soup.subarray(t, t + 9)); }
    variants.push(['l', concat([...L, await loadSoup(def.extra.l)])], ['r', concat([...R, await loadSoup(def.extra.r)])]);
  } else if (def.c) variants.push([null, await loadSoup(def.c)]);
  if (def.l) variants.push(['l', await loadSoup(def.l)]);
  if (def.r) variants.push(['r', await loadSoup(def.r)]);
  for (const [side, soup] of variants) {
    const id = side ? `${key}_${side}` : key;
    raw[id] = soup;
    const mesh = simplify(weld(soup), def.tris);
    totalTris += mesh.indices.length / 3;
    parts.push({ id, key, side, sys: def.sys, mesh });
    process.stdout.write(`${id.padEnd(26)} ${String(soup.length / 9).padStart(8)} -> ${mesh.indices.length / 3}\n`);
  }
}

// ------------------------------------------------------------ procedural parts from landmarks
function addProc(key, side, sys, mesh) {
  const id = side ? `${key}_${side}` : key;
  parts.push({ id, key, side, sys, mesh }); totalTris += mesh.indices.length / 3;
  console.log(`${id.padEnd(26)} procedural -> ${mesh.indices.length / 3}`);
}

// spinal cord along the central canal
{
  const canal = readSTL(await ensureFile(78497));
  const bb = bbox(canal);
  const sl = slices(canal, bb.max[1], bb.min[1], 0.012);
  const pts = sl.map((s) => [s.cx, s.y, s.cz]);
  const len = pts.length;
  const cord = tubeMesh(pts, (t) => 0.0052 + 0.0016 * Math.exp(-(((t - 0.13) / 0.08) ** 2)) + 0.0012 * Math.exp(-(((t - 0.82) / 0.07) ** 2)) - 0.003 * Math.max(0, (t - 0.9) / 0.1), Math.max(80, len * 3), 14);
  const lumbar = slices(raw.lumbar_spine, bbox(raw.lumbar_spine).max[1], bbox(raw.sacrum).c[1], 0.01);
  const end = sl[sl.length - 1], extras = [cord];
  // cauda equina: nerve roots descending to the sacrum
  const sac = bbox(raw.sacrum);
  for (const o of [-0.006, -0.003, 0, 0.003, 0.006]) {
    const p = [[end.cx + o * 0.3, end.y + 0.005, end.cz]];
    for (const s of lumbar) if (s.y < end.y) p.push([s.cx + o * (1 + (end.y - s.y) * 6), s.y, end.cz + (s.cz - lumbar[0].cz) * 0.3]);
    p.push([o * 4, sac.c[1], sac.max[2] - 0.015]);
    extras.push(tubeMesh(p, () => 0.0011, 40, 5));
  }
  addProc('spinal_cord', null, 'nervous', mergeMeshes(extras));
}

for (const [side, s] of [['l', 1], ['r', -1]]) {
  // --- sciatic nerve: sacral plexus -> greater sciatic foramen -> posterior thigh -> popliteal fossa -> tibial nerve
  {
    const fem = raw[`femur_${side}`], fb = bbox(fem), sac = bbox(raw.sacrum), tib = raw[`tibia_${side}`], tb = bbox(tib);
    const fs_ = slices(fem, fb.max[1] - 0.08, fb.min[1] + 0.05, 0.04);
    const ts = slices(tib, tb.max[1] - 0.03, tb.min[1] + 0.06, 0.05);
    const pts = [
      [s * 0.03, sac.c[1] + 0.02, sac.max[2] - 0.01],
      [s * 0.06, sac.c[1] - 0.02, sac.min[2] + 0.01],
      [fb.c[0] - s * 0.01, fb.max[1] - 0.05, fb.min[2] - 0.035],
      ...fs_.map((b) => [b.cx - s * 0.006, b.y, b.minZ - 0.022]),
      [fb.c[0] - s * 0.005, fb.min[1] + 0.01, fb.min[2] - 0.01],
      ...ts.map((b) => [b.cx - s * 0.002, b.y, b.minZ - 0.018]),
    ];
    addProc('sciatic_nerve', side, 'nervous', tubeMesh(pts, (t) => 0.0055 - 0.0028 * t, 160, 10));
  }
  // --- arm landmarks shared by median nerve & brachial artery
  const hum = raw[`humerus_${side}`], hb = bbox(hum);
  const rad = raw[`radius_${side}`], uln = raw[`ulna_${side}`];
  const fore = concat([rad, uln]), fob = bbox(fore), hand = bbox(raw[`hand_${side}`]);
  const hs = slices(hum, hb.max[1] - 0.05, hb.min[1] + 0.02, 0.04);
  const fsl = slices(fore, fob.max[1] - 0.03, fob.min[1] + 0.02, 0.04);
  const armPath = (medial, ant) => [
    ...hs.map((b) => [b.cx - s * medial, b.y, b.maxZ + ant]),
    ...fsl.map((b) => [b.cx, b.y, b.maxZ + ant * 0.6]),
    [hand.c[0], fob.min[1] - 0.01, hand.c[2] + 0.004],
    [hand.c[0], hand.c[1] + 0.02, hand.c[2] + 0.006],
  ];
  // --- median nerve
  {
    const pl = [s * 0.05, hb.max[1] - 0.01, hb.c[2] - 0.01];
    addProc('median_nerve', side, 'nervous', tubeMesh([pl, ...armPath(0.016, 0.004)], (t) => 0.0026 - 0.0008 * t, 140, 8));
  }
  // --- brachial artery: continue from the subclavian artery (real) down the arm, split into radial & ulnar
  {
    const sub = raw[`brachial_artery_${side}`];
    let tip = null; for (let i = 0; i < sub.length; i += 3) if (!tip || s * sub[i] > s * tip[0]) tip = [sub[i], sub[i + 1], sub[i + 2]];
    const arm = hs.map((b) => [b.cx - s * 0.012, b.y, b.maxZ + 0.008]);
    const elbow = arm[arm.length - 1];
    const rs = slices(rad, fob.max[1] - 0.04, fob.min[1] + 0.01, 0.05), us = slices(uln, fob.max[1] - 0.04, fob.min[1] + 0.01, 0.05);
    const brach = tubeMesh([tip, [tip[0] + s * 0.02, tip[1] - 0.02, tip[2]], ...arm], () => 0.0032, 120, 10);
    const radial = tubeMesh([elbow, ...rs.map((b) => [b.cx + s * 0.004, b.y, b.maxZ + 0.004]), [hand.c[0] + s * 0.02, hand.c[1] + 0.01, hand.c[2] + 0.008]], () => 0.0021, 80, 8);
    const ulnar = tubeMesh([elbow, ...us.map((b) => [b.cx - s * 0.002, b.y, b.maxZ + 0.004]), [hand.c[0] - s * 0.015, hand.c[1] + 0.01, hand.c[2] + 0.008]], () => 0.0021, 80, 8);
    const arch = tubeMesh([[hand.c[0] + s * 0.02, hand.c[1] + 0.01, hand.c[2] + 0.008], [hand.c[0], hand.c[1] - 0.005, hand.c[2] + 0.01], [hand.c[0] - s * 0.015, hand.c[1] + 0.01, hand.c[2] + 0.008]], () => 0.0016, 30, 6);
    const i = parts.findIndex((p) => p.id === `brachial_artery_${side}`);
    parts[i].mesh = mergeMeshes([parts[i].mesh, brach, radial, ulnar, arch]);
  }
  // --- femoral artery: from external iliac (real) -> femoral -> popliteal -> tibial arteries
  {
    const ext = raw[`femoral_artery_${side}`];
    let tip = null; for (let i = 0; i < ext.length; i += 3) if (!tip || ext[i + 1] < tip[1]) tip = [ext[i], ext[i + 1], ext[i + 2]];
    const fem = raw[`femur_${side}`], fb = bbox(fem), tib = raw[`tibia_${side}`], tb = bbox(tib);
    const fs_ = slices(fem, tip[1] - 0.04, fb.min[1] + 0.06, 0.04);
    const thigh = fs_.map((b, k) => {
      const u = k / (fs_.length - 1);           // anterior-medial at the top -> posterior (adductor hiatus) at the bottom
      return [b.cx - s * (0.022 - 0.012 * u), b.y, THREE.MathUtils.lerp(b.maxZ + 0.012, b.minZ - 0.012, Math.pow(u, 1.6))];
    });
    const knee = [fb.c[0], fb.min[1] + 0.01, fb.min[2] - 0.015];
    const ts = slices(tib, tb.max[1] - 0.05, tb.min[1] + 0.05, 0.05);
    const post = ts.map((b) => [b.cx - s * 0.008, b.y, b.minZ - 0.008]);
    const ant = ts.slice(1).map((b) => [b.cx + s * 0.012, b.y, b.maxZ - 0.004]);
    const foot = bbox(raw[`foot_${side}`]);
    const main = tubeMesh([tip, ...thigh, knee, ...post, [tb.c[0] - s * 0.012, foot.max[1] - 0.01, foot.min[2] + 0.04], [foot.c[0] - s * 0.01, foot.min[1] + 0.012, foot.c[2]]], (t) => 0.0042 - 0.0018 * t, 200, 10);
    const antTib = tubeMesh([[knee[0], ts[0].y, knee[2] + 0.01], ...ant, [foot.c[0], foot.max[1] - 0.005, foot.c[2] + 0.02], [foot.c[0] - s * 0.005, foot.max[1] - 0.015, foot.max[2] - 0.05]], () => 0.0022, 100, 8);
    const i = parts.findIndex((p) => p.id === `femoral_artery_${side}`);
    parts[i].mesh = mergeMeshes([parts[i].mesh, main, antTib]);
  }
}

// thyroid gland: two lobes + isthmus on the trachea just below the thyroid cartilage
{
  const tr = raw.trachea, tb = bbox(tr), lx = bbox(raw.larynx);
  const top = Math.min(tb.max[1], lx.min[1] + 0.02);
  const sl = slices(tr, top - 0.005, top - 0.05, 0.01);
  const mid = sl[Math.floor(sl.length / 2)] || { cx: tb.c[0], cz: tb.c[2], y: top - 0.025, minX: tb.min[0], maxX: tb.max[0], maxZ: tb.max[2] };
  const rr = (mid.maxX - mid.minX) / 2;
  const lobes = [1, -1].map((s) => ellipsoidMesh(0.009, 0.022, 0.009, [mid.cx + s * (rr + 0.006), mid.y, mid.cz + 0.004], (v) => { if (v.z * 1 < 0) v.z *= 0.7; }));
  const isth = ellipsoidMesh(rr + 0.004, 0.006, 0.004, [mid.cx, mid.y - 0.008, mid.maxZ + 0.003]);
  addProc('thyroid', null, 'endocrine', mergeMeshes([...lobes, isth]));
}

// ------------------------------------------------------------ global placement: feet on y=0, centred
const skin = parts.find((p) => p.id === 'skin').mesh;
const sb = bbox(skin.positions);
const OFF = [-(sb.min[0] + sb.max[0]) / 2, -sb.min[1], -(sb.min[2] + sb.max[2]) / 2];
console.log('\nbody size (m):', (sb.max[0] - sb.min[0]).toFixed(3), (sb.max[1] - sb.min[1]).toFixed(3), (sb.max[2] - sb.min[2]).toFixed(3));

// ------------------------------------------------------------ write glTF
const doc = new Document();
const buffer = doc.createBuffer();
const scene = doc.createScene('anatomy');
const root = doc.createNode('body');
scene.addChild(root);
for (const p of parts) {
  const P = p.mesh.positions;
  for (let i = 0; i < P.length; i += 3) { P[i] += OFF[0]; P[i + 1] += OFF[1]; P[i + 2] += OFF[2]; }
  const c = bbox(P).c;
  for (let i = 0; i < P.length; i += 3) { P[i] -= c[0]; P[i + 1] -= c[1]; P[i + 2] -= c[2]; }
  const N = normals(p.mesh);
  const pos = doc.createAccessor().setType('VEC3').setArray(P).setBuffer(buffer);
  const nor = doc.createAccessor().setType('VEC3').setArray(N).setBuffer(buffer);
  const ind = doc.createAccessor().setType('SCALAR').setArray(P.length / 3 < 65535 ? new Uint16Array(p.mesh.indices) : p.mesh.indices).setBuffer(buffer);
  const prim = doc.createPrimitive().setAttribute('POSITION', pos).setAttribute('NORMAL', nor).setIndices(ind);
  const mesh = doc.createMesh(p.id).addPrimitive(prim);
  const node = doc.createNode(p.id).setMesh(mesh).setTranslation(c).setExtras({ key: p.key, side: p.side, sys: p.sys });
  root.addChild(node);
}
doc.getRoot().getAsset().copyright = 'BodyParts3D, (c) The Database Center for Life Science, CC BY-SA 2.1 JP';

doc.createExtension(KHRMeshQuantization).setRequired(true);
await doc.transform(reorder({ encoder: MeshoptEncoder }), quantize({ quantizePosition: 14, quantizeNormal: 10 }));
doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.QUANTIZE });

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
fs.mkdirSync(path.dirname(OUT), { recursive: true });
await io.write(OUT, doc);
console.log(`\n${parts.length} parts, ${totalTris.toLocaleString()} triangles -> ${OUT} (${(fs.statSync(OUT).size / 1e6).toFixed(2)} MB)`);
