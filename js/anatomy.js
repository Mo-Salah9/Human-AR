// =====================================================================
//  Procedural 3D human anatomy (units = metres, feet at y = 0, facing +Z)
//  The person's LEFT side is +X (s = +1), RIGHT side is -X (s = -1).
// =====================================================================
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const UP = new THREE.Vector3(0, 1, 0);
const vec = (p) => (p.isVector3 ? p.clone() : new THREE.Vector3(p[0], p[1], p[2]));
const smooth = (x) => { const t = Math.min(1, Math.max(0, x)); return t * t * (3 - 2 * t); };

// ------------------------------------------------------------ primitives
function ellipsoid(rx, ry, rz, pos = [0, 0, 0], rot = null, seg = [32, 24], deform = null) {
  const g = new THREE.SphereGeometry(1, seg[0], seg[1]);
  if (deform) applyDeform(g, deform);           // deform in unit-sphere space
  g.scale(rx, ry, rz);
  if (rot) g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rot[0], rot[1], rot[2])));
  g.translate(pos[0], pos[1], pos[2]);
  if (deform) g.computeVertexNormals();
  return g;
}

function applyDeform(g, fn) {
  const p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    fn(v);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  p.needsUpdate = true;
  g.computeVertexNormals();
  return g;
}

// displace along normals with a pseudo-noise (organic surface / gyri / folia)
function bumpify(g, amp, freq, mode = 'blob') {
  const p = g.attributes.position, n = g.attributes.normal;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    let d;
    if (mode === 'gyri') {
      d = Math.sin(x * freq + Math.sin(y * freq * 0.8) * 1.7) * Math.cos(z * freq * 0.9 + Math.sin(x * freq * 0.6) * 1.7);
      d = Math.sign(d) * Math.pow(Math.abs(d), 0.6);
    } else if (mode === 'folia') {
      d = Math.sin(y * freq + Math.sin(z * 60) * 0.6);
    } else {
      d = Math.sin(x * freq + 1.3) * Math.sin(y * freq * 1.13 + 2.1) * Math.sin(z * freq * 0.87 + 0.7)
        + 0.5 * Math.sin(x * freq * 2.1 + y * freq * 1.7) * Math.sin(z * freq * 2.3);
    }
    p.setXYZ(i, x + n.getX(i) * d * amp, y + n.getY(i) * d * amp, z + n.getZ(i) * d * amp);
  }
  p.needsUpdate = true;
  g.computeVertexNormals();
  return g;
}

function orient(g, A, B) {
  const dir = B.clone().sub(A).normalize();
  g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(UP, dir));
  g.translate(A.x, A.y, A.z);
  return g;
}

// Lathe shape oriented from point a to point b. profile: [[radiusFactor, t(0..1)], ...]
function latheBetween(a, b, profile, r, seg = 18, sx = 1, sz = 1) {
  const A = vec(a), B = vec(b), len = A.distanceTo(B);
  const pts = profile.map(([pr, t]) => new THREE.Vector2(Math.max(pr * r, 1e-4), t * len));
  const g = new THREE.LatheGeometry(pts, seg);
  g.scale(sx, 1, sz);
  return orient(g, A, B);
}

const BONE = [[0, 0], [0.75, 0.006], [1.25, 0.03], [1.3, 0.06], [0.85, 0.12], [0.62, 0.22], [0.56, 0.5], [0.62, 0.78], [0.85, 0.88], [1.3, 0.94], [1.25, 0.97], [0.75, 0.994], [0, 1]];
const SPINDLE = [[0, 0], [0.25, 0.03], [0.6, 0.15], [0.9, 0.35], [1, 0.5], [0.9, 0.65], [0.6, 0.85], [0.25, 0.97], [0, 1]];
const BELLY_HIGH = [[0, 0], [0.35, 0.03], [0.85, 0.12], [1, 0.28], [0.85, 0.5], [0.45, 0.75], [0.22, 0.95], [0, 1]];
const CONE = [[1, 0], [1, 0.02], [0.02, 1]];

// Tube with variable radius along a Catmull-Rom curve (ends close smoothly)
function varTube(points, radiusFn, tubular = 64, radial = 12, capFrac = 0.03) {
  const curve = new THREE.CatmullRomCurve3(points.map(vec), false, 'centripetal');
  const frames = curve.computeFrenetFrames(tubular, false);
  const pos = [], nor = [], uv = [], idx = [];
  const P = new THREE.Vector3(), N = new THREE.Vector3();
  for (let i = 0; i <= tubular; i++) {
    const t = i / tubular;
    curve.getPointAt(t, P);
    const cap = Math.sqrt(Math.min(1, Math.min(t, 1 - t) / capFrac));
    const r = radiusFn(t) * cap;
    const Nn = frames.normals[i], Bn = frames.binormals[i];
    for (let j = 0; j <= radial; j++) {
      const v = (j / radial) * Math.PI * 2, s = Math.sin(v), c = -Math.cos(v);
      N.set(c * Nn.x + s * Bn.x, c * Nn.y + s * Bn.y, c * Nn.z + s * Bn.z).normalize();
      pos.push(P.x + r * N.x, P.y + r * N.y, P.z + r * N.z);
      nor.push(N.x, N.y, N.z);
      uv.push(t, j / radial);
    }
  }
  for (let i = 0; i < tubular; i++) {
    for (let j = 0; j < radial; j++) {
      const a = (radial + 1) * i + j, b = (radial + 1) * (i + 1) + j;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}
const tube = (pts, r, tubular = 48, radial = 10) => varTube(pts, () => r, tubular, radial);
const profileFn = (arr) => (t) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (t <= arr[i + 1][0]) { const k = (t - arr[i][0]) / (arr[i + 1][0] - arr[i][0]); return arr[i][1] + (arr[i + 1][1] - arr[i][1]) * k; }
  }
  return arr[arr.length - 1][1];
};

// curve a sheet around the body: z += k * x^2
function bendZ(g, k) { return applyDeform(g, (v) => { v.z += k * v.x * v.x; }); }

const merge = (list) => mergeGeometries(list.filter(Boolean), false);

// ------------------------------------------------------------ spine helpers
const SPINE = [[1.57, -0.005], [1.50, -0.012], [1.44, -0.035], [1.36, -0.062], [1.26, -0.075], [1.16, -0.066], [1.08, -0.048], [1.0, -0.045], [0.95, -0.062]];
function interpTable(tab, y) {
  if (y >= tab[0][0]) return tab[0][1];
  for (let i = 0; i < tab.length - 1; i++) {
    const [y0, z0] = tab[i], [y1, z1] = tab[i + 1];
    if (y <= y0 && y >= y1) return z0 + (z1 - z0) * ((y0 - y) / (y0 - y1));
  }
  return tab[tab.length - 1][1];
}
const spineZ = (y) => interpTable(SPINE, y);
const vertR = (y) => interpTable([[1.56, 0.011], [1.45, 0.013], [1.16, 0.018], [0.98, 0.022]], y);
const canalZ = (y) => spineZ(y) - 1.65 * vertR(y);

function vertebra(y, r, h, spLen, tpLen, spDrop) {
  const z = spineZ(y), list = [];
  const body = new THREE.CylinderGeometry(r, r * 1.04, h, 16, 1);
  body.translate(0, y, z); list.push(body);
  const arch = new THREE.TorusGeometry(r * 0.72, r * 0.2, 6, 18);
  arch.rotateX(Math.PI / 2); arch.translate(0, y, z - r * 1.65); list.push(arch);
  list.push(latheBetween([0, y, z - r * 2.3], [0, y - spDrop, z - r * 2.3 - spLen], [[0.6, 0], [1, 0.3], [0.7, 0.9], [0, 1]], r * 0.28, 8));
  for (const s of [1, -1]) {
    list.push(latheBetween([s * r * 0.8, y, z - r * 1.5], [s * (r + tpLen), y + 0.002, z - r * 1.9], [[0.7, 0], [1, 0.5], [0.8, 0.95], [0, 1]], r * 0.22, 8));
  }
  return merge(list);
}

// ------------------------------------------------------------ procedural textures
function canvasTexture(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
let _fiberTex, _noiseTex;
function fiberTexture() {
  if (_fiberTex) return _fiberTex;
  _fiberTex = canvasTexture(256, 64, (ctx, w, h) => {
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 2) {
      const l = 200 + Math.random() * 55;
      ctx.fillStyle = `rgb(${l},${l * 0.92},${l * 0.92})`;
      ctx.fillRect(x, 0, 1 + Math.random() * 1.5, h);
    }
  });
  return _fiberTex;
}
function noiseTexture() {
  if (_noiseTex) return _noiseTex;
  _noiseTex = canvasTexture(128, 128, (ctx, w, h) => {
    const img = ctx.createImageData(w, h);
    for (let i = 0; i < img.data.length; i += 4) {
      const l = 225 + Math.random() * 30;
      img.data[i] = l; img.data[i + 1] = l; img.data[i + 2] = l; img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  });
  return _noiseTex;
}

export function makeMaterial(system, color, opts = {}) {
  const base = {
    color: new THREE.Color(color), roughness: 0.55, metalness: 0,
    side: opts.doubleSide ? THREE.DoubleSide : THREE.FrontSide,
  };
  const tex = !opts.noTextures;
  if (system === 'muscular') {
    Object.assign(base, { roughness: 0.48, clearcoat: 0.3, clearcoatRoughness: 0.45, sheen: 0.35, sheenRoughness: 0.5, sheenColor: new THREE.Color('#ff9c8c') });
    if (tex) { base.map = fiberTexture(); base.bumpMap = fiberTexture(); base.bumpScale = 0.6; }
  } else if (system === 'skeletal') {
    Object.assign(base, { roughness: 0.62, clearcoat: 0.12, clearcoatRoughness: 0.6, sheen: 0.25, sheenColor: new THREE.Color('#fff4dc') });
    if (tex) base.map = noiseTexture();
  } else if (system === 'skin') {
    Object.assign(base, { roughness: 0.55, sheen: 0.6, sheenRoughness: 0.6, sheenColor: new THREE.Color('#ffd9c4') });
  } else {
    Object.assign(base, { roughness: 0.38, clearcoat: 0.55, clearcoatRoughness: 0.28, sheen: 0.2, sheenColor: new THREE.Color('#ffffff') });
  }
  if (opts.emissive) { base.emissive = new THREE.Color(opts.emissive); }
  return new THREE.MeshPhysicalMaterial(base);
}

// =====================================================================
export function buildAnatomy(PARTS) {
  const root = new THREE.Group();
  root.name = 'body';
  const parts = new Map();
  const systemGroups = {};

  function addPart(key, side, system, geom, color, opts = {}) {
    const g = Array.isArray(geom) ? merge(geom) : geom;
    g.computeBoundingBox();
    const c = new THREE.Vector3(); g.boundingBox.getCenter(c);
    g.translate(-c.x, -c.y, -c.z);
    g.computeBoundingBox(); g.computeBoundingSphere();
    const mesh = new THREE.Mesh(g, makeMaterial(system, color, opts));
    mesh.position.copy(c);
    const id = side ? `${key}_${side}` : key;
    const data = PARTS[key];
    if (!data) console.warn('No data for part', key);
    mesh.name = id;
    mesh.userData = {
      id, key, side, system,
      layer: (data && data.layer) || opts.layer || 0,
      home: { pos: c.clone(), quat: mesh.quaternion.clone(), scale: mesh.scale.clone() },
      manual: new THREE.Vector3(), dir: new THREE.Vector3(),
      baseColor: new THREE.Color(color),
    };
    if (!systemGroups[system]) { systemGroups[system] = new THREE.Group(); systemGroups[system].name = system; root.add(systemGroups[system]); }
    systemGroups[system].add(mesh);
    parts.set(id, mesh);
    return mesh;
  }
  const both = (fn) => { fn(1, 'l'); fn(-1, 'r'); };

  // =================================================================== SKIN
  {
    const L = [];
    L.push(ellipsoid(0.083, 0.112, 0.1, [0, 1.635, 0.012]));
    L.push(ellipsoid(0.012, 0.022, 0.012, [0.083, 1.63, 0.0])); // ears
    L.push(ellipsoid(0.012, 0.022, 0.012, [-0.083, 1.63, 0.0]));
    L.push(latheBetween([0, 1.43, -0.01], [0, 1.57, -0.012], [[1.05, 0], [0.95, 0.5], [1, 1]], 0.05, 24));
    const prof = [[0.0, 0.80], [0.11, 0.805], [0.158, 0.85], [0.168, 0.92], [0.145, 1.0], [0.136, 1.05], [0.145, 1.12], [0.156, 1.2], [0.166, 1.3], [0.172, 1.37], [0.155, 1.425], [0.1, 1.465], [0.055, 1.485], [0.0, 1.49]];
    const torso = new THREE.LatheGeometry(prof.map(([r, y]) => new THREE.Vector2(Math.max(r, 1e-4), y)), 40);
    torso.scale(1, 1, 0.64); torso.translate(0, 0, 0.012);
    L.push(torso);
    both((s) => {
      L.push(latheBetween([s * 0.19, 1.43, -0.018], [s * 0.237, 1.12, -0.018], [[0.2, 0], [0.9, 0.06], [1, 0.2], [0.92, 0.55], [0.78, 0.92], [0.4, 1]], 0.05, 20));
      L.push(latheBetween([s * 0.236, 1.135, -0.016], [s * 0.282, 0.865, -0.004], [[0.4, 0], [0.9, 0.08], [1, 0.25], [0.72, 0.85], [0.6, 0.97], [0.3, 1]], 0.042, 20));
      L.push(ellipsoid(0.034, 0.062, 0.016, [s * 0.288, 0.8, 0.0], [0, 0, s * 0.08]));
      L.push(latheBetween([s * 0.092, 0.88, 0.0], [s * 0.093, 0.48, 0.0], [[0.6, 0], [1, 0.08], [0.95, 0.3], [0.8, 0.75], [0.66, 1]], 0.083, 24));
      L.push(latheBetween([s * 0.093, 0.51, 0.0], [s * 0.09, 0.06, -0.005], [[0.85, 0], [0.95, 0.12], [1, 0.3], [0.78, 0.6], [0.5, 0.92], [0.45, 1]], 0.06, 22));
      L.push(ellipsoid(0.038, 0.032, 0.125, [s * 0.095, 0.035, 0.05]));
    });
    addPart('skin', null, 'skin', L, '#e8b896');
  }

  // =================================================================== SKELETAL
  const BONEC = '#efe6cf';
  // skull
  addPart('skull', null, 'skeletal', [
    ellipsoid(0.076, 0.086, 0.096, [0, 1.668, -0.006], null, [40, 30]),
    ellipsoid(0.056, 0.06, 0.05, [0, 1.6, 0.036]),
    ellipsoid(0.065, 0.022, 0.03, [0, 1.615, 0.035]), // zygomatic arches
    ellipsoid(0.03, 0.03, 0.02, [0, 1.62, -0.07]),     // occipital
  ].map((g) => bumpify(g, 0.0012, 90)), BONEC);
  // mandible
  {
    const pts = [[-0.054, 1.618, -0.012], [-0.05, 1.575, -0.008], [-0.047, 1.548, 0.02], [-0.03, 1.535, 0.062], [0, 1.53, 0.08], [0.03, 1.535, 0.062], [0.047, 1.548, 0.02], [0.05, 1.575, -0.008], [0.054, 1.618, -0.012]];
    addPart('mandible', null, 'skeletal', [
      varTube(pts, (t) => 0.0075 + 0.003 * Math.sin(t * Math.PI), 60, 12),
      ellipsoid(0.008, 0.008, 0.008, [0.054, 1.62, -0.012]),
      ellipsoid(0.008, 0.008, 0.008, [-0.054, 1.62, -0.012]),
    ], BONEC);
  }
  // spine
  {
    const cerv = [], thor = [], lumb = [];
    for (let i = 0; i < 7; i++) { const y = 1.555 - i * 0.0165; cerv.push(vertebra(y, vertR(y), 0.01, 0.014, 0.012, 0.004)); }
    for (let i = 0; i < 12; i++) { const y = 1.435 - i * 0.0245; thor.push(vertebra(y, vertR(y), 0.017, 0.022, 0.016, 0.014)); }
    for (let i = 0; i < 5; i++) { const y = 1.14 - i * 0.036; lumb.push(vertebra(y, vertR(y), 0.026, 0.024, 0.024, 0.006)); }
    // intervertebral discs (merged with their region)
    const disc = (y, r) => { const d = new THREE.CylinderGeometry(r * 0.95, r * 0.95, 0.004, 14); d.translate(0, y, spineZ(y)); return d; };
    for (let i = 0; i < 6; i++) { const y = 1.555 - i * 0.0165 - 0.00825; cerv.push(disc(y, vertR(y))); }
    for (let i = 0; i < 11; i++) { const y = 1.435 - i * 0.0245 - 0.01225; thor.push(disc(y, vertR(y))); }
    for (let i = 0; i < 4; i++) { const y = 1.14 - i * 0.036 - 0.018; lumb.push(disc(y, vertR(y))); }
    addPart('cervical_spine', null, 'skeletal', cerv, BONEC);
    addPart('thoracic_spine', null, 'skeletal', thor, BONEC);
    addPart('lumbar_spine', null, 'skeletal', lumb, BONEC);
    addPart('sacrum', null, 'skeletal', [
      ellipsoid(0.046, 0.055, 0.018, [0, 0.935, -0.072], [0.45, 0, 0], [24, 18], (v) => { v.x *= 1 - 0.45 * smooth(-v.y); }),
      latheBetween([0, 0.888, -0.092], [0, 0.858, -0.08], CONE, 0.011, 10),
    ], BONEC);
  }
  // pelvis (both hip bones)
  {
    const L = [];
    both((s) => {
      L.push(bumpify(ellipsoid(0.066, 0.058, 0.013, [s * 0.087, 0.975, -0.03], [0, -s * 0.75, -s * 0.25], [28, 18]), 0.0015, 70));
      L.push(tube([[s * 0.1, 0.95, -0.012], [s * 0.093, 0.91, -0.004], [s * 0.088, 0.886, 0.0]], 0.014, 16, 10));
      const acet = new THREE.TorusGeometry(0.02, 0.0065, 8, 20); acet.rotateY(s * Math.PI / 2.4); acet.translate(s * 0.094, 0.886, 0.0); L.push(acet);
      const obt = new THREE.TorusGeometry(0.021, 0.005, 8, 20); obt.rotateY(-s * 0.55); obt.translate(s * 0.058, 0.85, 0.026); L.push(obt);
      L.push(tube([[s * 0.086, 0.885, 0.012], [s * 0.05, 0.872, 0.05], [s * 0.008, 0.862, 0.062]], 0.0085, 16, 8));
      L.push(ellipsoid(0.012, 0.02, 0.013, [s * 0.062, 0.826, -0.006]));
    });
    L.push(ellipsoid(0.01, 0.018, 0.009, [0, 0.862, 0.062]));
    addPart('pelvis', null, 'skeletal', L, BONEC);
  }
  // ribs
  {
    const L = [];
    const W = [0.065, 0.088, 0.103, 0.113, 0.12, 0.125, 0.127, 0.126, 0.122, 0.114, 0.1, 0.085];
    const Bd = [0.058, 0.07, 0.075, 0.082, 0.087, 0.09, 0.09, 0.09, 0.088, 0.085, 0.08, 0.075];
    const zStern = (y) => 0.055 + ((1.40 - y) / 0.18) * 0.035;
    for (let i = 0; i < 12; i++) {
      const yb = 1.43 - i * 0.022, w = W[i], b = Bd[i];
      const back = spineZ(yb) - 0.025, zc = back + b;
      both((s) => {
        const phi0 = -Math.acos(Math.min(0.99, 0.02 / w));
        let phi1, yEnd, cart = null;
        if (i < 7) { const ys = 1.395 - i * 0.026; phi1 = Math.acos(0.045 / w); yEnd = ys - 0.004; cart = [[s * 0.045, yEnd, 0], [s * 0.016, ys, zStern(ys)]]; }
        else if (i < 10) { phi1 = Math.acos(Math.min(0.99, 0.075 / w)); yEnd = yb - 0.11; cart = [[s * 0.075, yEnd, 0], [s * 0.05, 1.235 - (i - 7) * 0.012, 0], [s * 0.02, 1.225, zStern(1.225)]]; }
        else { phi1 = 0.25; yEnd = yb - 0.07; }
        const pts = [];
        const N = 12;
        for (let k = 0; k <= N; k++) {
          const u = k / N, phi = phi0 + (phi1 - phi0) * u;
          pts.push([s * w * Math.cos(phi), yb - (yb - yEnd) * Math.pow(u, 1.3), zc + b * Math.sin(phi)]);
        }
        L.push(varTube(pts, (t) => 0.0042 * (1 - 0.2 * t), 36, 7));
        if (cart) {
          const last = pts[pts.length - 1];
          const cp = cart.map((c, k) => (k === 0 ? last : c));
          if (cp.length === 2) cp.splice(1, 0, [(cp[0][0] + cp[1][0]) / 2, (cp[0][1] + cp[1][1]) / 2, Math.max(cp[0][2], cp[1][2]) + 0.002]);
          else cp[1] = [cp[1][0], cp[1][1], zStern(cp[1][1]) - 0.004];
          L.push(tube(cp, 0.0036, 14, 6));
        }
      });
    }
    addPart('ribs', null, 'skeletal', L, BONEC);
    addPart('sternum', null, 'skeletal', [
      ellipsoid(0.026, 0.024, 0.008, [0, 1.38, zStern(1.38) + 0.004]),
      ellipsoid(0.017, 0.07, 0.008, [0, 1.295, zStern(1.295) + 0.004], [-0.11, 0, 0]),
      latheBetween([0, 1.228, zStern(1.228) + 0.004], [0, 1.2, zStern(1.2) + 0.006], [[1, 0], [0.8, 0.5], [0.1, 1]], 0.008, 10, 1, 0.5),
    ], BONEC);
  }
  // upper limb bones
  both((s, side) => {
    addPart('clavicle', side, 'skeletal', [varTube([[s * 0.02, 1.415, 0.072], [s * 0.07, 1.428, 0.064], [s * 0.12, 1.437, 0.03], [s * 0.15, 1.44, 0.0], [s * 0.172, 1.445, -0.018]], (t) => 0.0062 + 0.0015 * Math.abs(t - 0.5) * 2, 30, 10)], BONEC);
    addPart('scapula', side, 'skeletal', [
      ellipsoid(0.048, 0.068, 0.006, [s * 0.112, 1.335, -0.097], [0, -s * 0.58, 0], [24, 18], (v) => { v.x *= 1 - 0.55 * smooth((-v.y + 0.2) / 1.2); }),
      tube([[s * 0.072, 1.37, -0.118], [s * 0.12, 1.385, -0.106], [s * 0.158, 1.42, -0.07], [s * 0.176, 1.437, -0.035]], 0.0055, 20, 8),
      ellipsoid(0.009, 0.018, 0.012, [s * 0.163, 1.405, -0.038]),
      tube([[s * 0.14, 1.41, -0.06], [s * 0.145, 1.422, -0.025], [s * 0.15, 1.408, -0.002]], 0.0045, 12, 8),
    ], BONEC);
    addPart('humerus', side, 'skeletal', [
      ellipsoid(0.021, 0.021, 0.021, [s * 0.178, 1.405, -0.026]),
      ellipsoid(0.01, 0.012, 0.01, [s * 0.19, 1.405, -0.012]),
      latheBetween([s * 0.184, 1.398, -0.026], [s * 0.233, 1.135, -0.026], BONE, 0.0125, 16),
      ellipsoid(0.029, 0.011, 0.012, [s * 0.235, 1.132, -0.026], [0, 0, s * 0.15]),
    ], BONEC);
    addPart('ulna', side, 'skeletal', [
      latheBetween([s * 0.224, 1.135, -0.036], [s * 0.262, 0.875, -0.012], BONE, 0.0072, 12),
      ellipsoid(0.009, 0.014, 0.008, [s * 0.224, 1.142, -0.044]),
    ], BONEC);
    addPart('radius', side, 'skeletal', [
      latheBetween([s * 0.247, 1.122, -0.014], [s * 0.289, 0.875, 0.0], BONE, 0.0072, 12),
      ellipsoid(0.014, 0.008, 0.012, [s * 0.288, 0.873, 0.0]),
    ], BONEC);
    // hand
    {
      const xw = s * 0.278, yw = 0.862, zw = -0.004, L = [];
      L.push(ellipsoid(0.022, 0.012, 0.008, [xw, yw - 0.004, zw]));
      const fingers = [[0.016, 0.95], [0.004, 1.0], [-0.008, 0.95], [-0.019, 0.8]];
      for (const [o, k] of fingers) {
        let x = xw + s * o, y = yw - 0.012;
        const dx = s * o * 0.25;
        const segs = [0.058 * k, 0.038 * k, 0.024 * k, 0.017 * k], rs = [0.0042, 0.0038, 0.0032, 0.0028];
        segs.forEach((len, n) => {
          const nx = x + dx * len * 10, ny = y - len;
          L.push(latheBetween([x, y, zw], [nx, ny, zw + 0.001 * n], BONE, rs[n], 8));
          x = nx; y = ny - 0.002;
        });
      }
      let tx = xw + s * 0.02, ty = yw - 0.006, tz = zw + 0.004;
      [[0.038, 0.0045], [0.028, 0.004], [0.02, 0.0033]].forEach(([len, r]) => {
        const nx = tx + s * len * 0.5, ny = ty - len * 0.82, nz = tz + len * 0.3;
        L.push(latheBetween([tx, ty, tz], [nx, ny, nz], BONE, r, 8));
        tx = nx; ty = ny - 0.002; tz = nz;
      });
      addPart('hand', side, 'skeletal', L, BONEC);
    }
  });
  // lower limb bones
  both((s, side) => {
    addPart('femur', side, 'skeletal', [
      ellipsoid(0.023, 0.023, 0.023, [s * 0.088, 0.886, 0.0]),
      tube([[s * 0.088, 0.886, 0.0], [s * 0.108, 0.876, -0.003], [s * 0.127, 0.864, -0.005]], 0.012, 12, 10),
      ellipsoid(0.015, 0.022, 0.016, [s * 0.136, 0.872, -0.01]),
      ellipsoid(0.008, 0.01, 0.008, [s * 0.112, 0.84, -0.014]),
      latheBetween([s * 0.128, 0.866, -0.005], [s * 0.093, 0.505, 0.0], BONE, 0.0135, 18),
      ellipsoid(0.015, 0.019, 0.023, [s * 0.075, 0.497, -0.004]),
      ellipsoid(0.015, 0.019, 0.023, [s * 0.11, 0.497, -0.004]),
    ], BONEC);
    addPart('patella', side, 'skeletal', [ellipsoid(0.018, 0.022, 0.009, [s * 0.093, 0.505, 0.03], null, [20, 14], (v) => { v.y *= 1 - 0.25 * smooth(-v.y); })], BONEC);
    addPart('tibia', side, 'skeletal', [
      ellipsoid(0.034, 0.011, 0.027, [s * 0.092, 0.472, 0.0]),
      ellipsoid(0.008, 0.012, 0.007, [s * 0.093, 0.445, 0.022]),
      latheBetween([s * 0.092, 0.47, 0.0], [s * 0.088, 0.083, 0.0], BONE, 0.0125, 18, 1, 0.9),
      ellipsoid(0.008, 0.016, 0.011, [s * 0.075, 0.07, 0.0]),
    ], BONEC);
    addPart('fibula', side, 'skeletal', [
      latheBetween([s * 0.123, 0.458, -0.012], [s * 0.116, 0.075, -0.012], BONE, 0.0058, 12),
      ellipsoid(0.007, 0.018, 0.009, [s * 0.118, 0.063, -0.012]),
    ], BONEC);
    {
      const L = [];
      L.push(ellipsoid(0.016, 0.012, 0.022, [s * 0.091, 0.056, 0.0]));
      L.push(ellipsoid(0.018, 0.02, 0.033, [s * 0.092, 0.03, -0.032]));
      L.push(ellipsoid(0.03, 0.012, 0.02, [s * 0.095, 0.04, 0.03]));
      const off = [-0.022, -0.011, 0, 0.011, 0.021];
      off.forEach((o, k) => {
        const x0 = s * (0.095 + o), r = k === 0 ? 0.0062 : 0.0042;
        const end = [x0 + s * o * 0.35, 0.013, 0.112 - k * 0.005];
        L.push(latheBetween([x0, 0.038, 0.045], end, BONE, r, 10));
        const toeLen = k === 0 ? 0.04 : 0.032 - k * 0.003;
        L.push(latheBetween([end[0], 0.012, end[2] + 0.002], [end[0] + s * o * 0.1, 0.008, end[2] + toeLen], BONE, r * 0.85, 8));
      });
      addPart('foot', side, 'skeletal', L, BONEC);
    }
  });

  // =================================================================== MUSCULAR
  const MUS = '#b8443e';
  both((s, side) => {
    addPart('sternocleidomastoid', side, 'muscular', [latheBetween([s * 0.047, 1.595, -0.028], [s * 0.022, 1.43, 0.066], SPINDLE, 0.011, 14, 1.2, 0.8)], MUS);
    addPart('trapezius', side, 'muscular', [bendZ(ellipsoid(0.075, 0.16, 0.011, [s * 0.065, 1.37, -0.128], [0, 0, s * 0.35], [28, 24], (v) => { v.x *= 1 - 0.55 * Math.abs(v.y); }), 2.0)], MUS);
    addPart('deltoid', side, 'muscular', [ellipsoid(0.036, 0.066, 0.044, [s * 0.207, 1.37, -0.022], [0, 0, s * 0.22], [26, 20], (v) => { if (s * v.x < 0) v.x *= 0.45; })], MUS);
    addPart('pectoralis_major', side, 'muscular', [bendZ(ellipsoid(0.082, 0.055, 0.014, [s * 0.078, 1.33, 0.098], [0, 0, s * 0.22], [28, 20], (v) => { v.y *= 1 - 0.35 * smooth(s * v.x); }), -2.0)], MUS);
    addPart('biceps', side, 'muscular', [latheBetween([s * 0.192, 1.37, 0.004], [s * 0.238, 1.13, 0.006], SPINDLE, 0.02, 16, 1, 0.9)], MUS);
    addPart('triceps', side, 'muscular', [latheBetween([s * 0.184, 1.385, -0.05], [s * 0.228, 1.14, -0.05], SPINDLE, 0.022, 16, 1.1, 0.95)], MUS);
    addPart('forearm_muscles', side, 'muscular', [latheBetween([s * 0.24, 1.125, -0.012], [s * 0.28, 0.885, -0.004], BELLY_HIGH, 0.026, 18, 1.05, 0.85)], MUS);
    addPart('rectus_abdominis', side, 'muscular', [bendZ(ellipsoid(0.034, 0.155, 0.011, [s * 0.037, 1.07, 0.104], null, [20, 40], (v) => { v.x *= 1 + 0.3 * v.y; v.z *= 1 + 0.35 * Math.cos(v.y * Math.PI * 3.5); }), -1.5)], MUS);
    addPart('external_oblique', side, 'muscular', [ellipsoid(0.012, 0.1, 0.065, [s * 0.125, 1.05, 0.04], [0, -s * 0.64, 0], [20, 24], (v) => { v.z *= 1 - 0.25 * v.y; })], MUS);
    addPart('latissimus_dorsi', side, 'muscular', [bendZ(ellipsoid(0.075, 0.12, 0.012, [s * 0.09, 1.17, -0.1], [0, 0, s * 0.35], [26, 24]), 2.5)], MUS);
    addPart('gluteus_maximus', side, 'muscular', [ellipsoid(0.07, 0.08, 0.045, [s * 0.075, 0.885, -0.088], [0, 0, -s * 0.3])], MUS);
    addPart('quadriceps', side, 'muscular', [latheBetween([s * 0.117, 0.84, 0.036], [s * 0.094, 0.53, 0.036], SPINDLE, 0.045, 20, 1, 0.85)], MUS);
    addPart('hamstrings', side, 'muscular', [latheBetween([s * 0.095, 0.82, -0.046], [s * 0.095, 0.52, -0.042], SPINDLE, 0.036, 18, 1, 0.9)], MUS);
    addPart('gastrocnemius', side, 'muscular', [
      latheBetween([s * 0.078, 0.48, -0.036], [s * 0.09, 0.14, -0.03], BELLY_HIGH, 0.022, 16),
      latheBetween([s * 0.108, 0.48, -0.036], [s * 0.09, 0.14, -0.03], BELLY_HIGH, 0.021, 16),
    ], MUS);
    addPart('tibialis_anterior', side, 'muscular', [latheBetween([s * 0.106, 0.445, 0.02], [s * 0.084, 0.1, 0.03], SPINDLE, 0.015, 14)], MUS);
  });

  // =================================================================== NERVOUS
  {
    const hem = (s) => {
      const g = ellipsoid(0.034, 0.05, 0.079, [0, 0, 0], null, [64, 48], (v) => {
        if (s * v.x < 0) v.x *= 0.35;        // flat medial surface
        if (v.y < -0.2 && v.z > -0.3 && v.z < 0.5) v.y -= 0.12 * smooth((v.z + 0.3) / 0.4); // temporal lobe
      });
      g.translate(s * 0.036, 1.685, 0.0);
      return bumpify(g, 0.0022, 260, 'gyri');
    };
    addPart('cerebrum', null, 'nervous', [hem(1), hem(-1)], '#e9aeb0');
    addPart('cerebellum', null, 'nervous', [bumpify(ellipsoid(0.048, 0.024, 0.03, [0, 1.62, -0.058], null, [48, 36], (v) => { if (v.y > 0) v.y *= 0.7; }), 0.0012, 900, 'folia')], '#d98f92');
    addPart('brainstem', null, 'nervous', [varTube([[0, 1.66, -0.012], [0, 1.625, -0.022], [0, 1.585, -0.026], [0, 1.56, -0.026]], (t) => 0.013 - 0.005 * t + 0.003 * Math.exp(-Math.pow((t - 0.45) / 0.15, 2)), 30, 14, 0.08)], '#e3a2a4');
    const cord = [];
    for (let y = 1.565; y >= 1.10; y -= 0.025) cord.push([0, y, canalZ(y)]);
    const L = [varTube(cord, (t) => 0.0048 + 0.0012 * Math.exp(-Math.pow((t - 0.12) / 0.08, 2)) + 0.001 * Math.exp(-Math.pow((t - 0.85) / 0.08, 2)), 80, 10, 0.02)];
    for (const o of [-0.004, -0.0015, 0.0015, 0.004]) {
      const pts = []; for (let y = 1.11; y >= 0.93; y -= 0.03) pts.push([o * (1 + (1.11 - y) * 4), y, canalZ(Math.max(y, 0.96))]);
      L.push(tube(pts, 0.0012, 24, 5));
    }
    addPart('spinal_cord', null, 'nervous', L, '#f4d35e');
  }
  both((s, side) => {
    addPart('sciatic_nerve', side, 'nervous', [tube([[s * 0.03, 0.925, -0.075], [s * 0.065, 0.875, -0.08], [s * 0.09, 0.83, -0.065], [s * 0.1, 0.72, -0.05], [s * 0.096, 0.6, -0.045], [s * 0.094, 0.5, -0.04], [s * 0.093, 0.42, -0.035]], 0.0042, 48, 8)], '#f4d35e');
    addPart('median_nerve', side, 'nervous', [tube([[s * 0.05, 1.44, -0.03], [s * 0.12, 1.40, -0.015], [s * 0.17, 1.35, -0.008], [s * 0.21, 1.22, 0.0], [s * 0.24, 1.12, 0.0], [s * 0.265, 1.0, 0.0], [s * 0.282, 0.87, 0.002], [s * 0.285, 0.82, 0.004]], 0.0022, 60, 6)], '#f4d35e');
    addPart('eye', side, 'nervous', [ellipsoid(0.012, 0.012, 0.012, [s * 0.031, 1.645, 0.07]), ellipsoid(0.006, 0.006, 0.003, [s * 0.031, 1.645, 0.0815])], '#f5f5f0');
  });

  // =================================================================== RESPIRATORY
  addPart('larynx', null, 'respiratory', [
    ellipsoid(0.017, 0.02, 0.015, [0, 1.5, 0.045], null, [24, 16], (v) => { if (v.z > 0) v.x *= 1 - 0.4 * v.z; }),
    (() => { const g = new THREE.TorusGeometry(0.0095, 0.003, 8, 20); g.rotateX(Math.PI / 2); g.translate(0, 1.478, 0.04); return g; })(),
    ellipsoid(0.01, 0.014, 0.003, [0, 1.525, 0.035], [-0.4, 0, 0]),
  ], '#e0c6b4');
  addPart('trachea', null, 'respiratory', [varTube([[0, 1.476, 0.04], [0, 1.42, 0.032], [0, 1.37, 0.022], [0, 1.335, 0.012]], (t) => 0.0085 + 0.0008 * Math.sin(t * Math.PI * 2 * 17), 160, 14, 0.01)], '#e0c6b4');
  addPart('bronchi', null, 'respiratory', [
    tube([[0, 1.338, 0.012], [-0.022, 1.315, 0.006], [-0.048, 1.29, 0.0]], 0.0066, 20, 10),
    tube([[-0.048, 1.29, 0.0], [-0.065, 1.32, -0.005], [-0.075, 1.34, -0.01]], 0.0045, 12, 8),
    tube([[-0.048, 1.29, 0.0], [-0.06, 1.25, 0.005], [-0.07, 1.21, 0.0]], 0.0048, 12, 8),
    tube([[-0.05, 1.27, 0.0], [-0.065, 1.265, 0.035]], 0.0035, 10, 8),
    tube([[0, 1.338, 0.012], [0.03, 1.318, 0.0], [0.055, 1.292, -0.006]], 0.006, 20, 10),
    tube([[0.055, 1.292, -0.006], [0.07, 1.32, -0.008], [0.078, 1.345, -0.012]], 0.0042, 12, 8),
    tube([[0.055, 1.292, -0.006], [0.07, 1.25, 0.0], [0.08, 1.21, 0.0]], 0.0045, 12, 8),
  ], '#e0c6b4');
  const lung = (s, rx, ry, rz, c) => {
    const g = ellipsoid(rx, ry, rz, c, null, [48, 40], (v) => {
      if (v.y > 0) { const k = 1 - 0.55 * v.y * v.y; v.x *= k; v.z *= k; }
      if (s * v.x < 0) v.x *= 0.5;
      if (s > 0 && v.x < 0 && v.y < 0.15 && v.z > 0.1) v.x *= 0.55; // cardiac notch
      if (v.y < -0.3) v.y = -0.3 + (v.y + 0.3) * 0.55;
      if (v.y < -0.45) v.y += (-v.y - 0.45) * 0.9 * (1 - (v.x * v.x + v.z * v.z));
    });
    return bumpify(g, 0.0012, 110);
  };
  addPart('lung_r', null, 'respiratory', [lung(-1, 0.058, 0.105, 0.072, [-0.07, 1.275, -0.005])], '#ee8d9a');
  addPart('lung_l', null, 'respiratory', [lung(1, 0.055, 0.1, 0.07, [0.072, 1.28, -0.005])], '#ee8d9a');
  {
    const g = new THREE.SphereGeometry(1, 48, 16, 0, Math.PI * 2, 0, 1.25);
    g.scale(0.135, 0.07, 0.095); g.translate(0, 1.1, -0.005);
    applyDeform(g, (v) => { v.y += -v.x * 0.12; });
    addPart('diaphragm', null, 'respiratory', [g], '#b0504a', { doubleSide: true });
  }

  // =================================================================== CIRCULATORY
  {
    const heart = ellipsoid(1, 1, 1, [0, 0, 0], null, [48, 40], (v) => {
      if (v.y < 0) { const k = 1 + v.y * 0.6; v.x *= k; v.z *= k; }
      v.x *= 0.045; v.y *= 0.058; v.z *= 0.04;
    });
    heart.rotateZ(0.6); heart.rotateX(-0.35);
    heart.translate(0.012, 1.245, 0.035);
    const atL = ellipsoid(0.024, 0.02, 0.022, [0.03, 1.283, 0.008]);
    const atR = ellipsoid(0.024, 0.024, 0.022, [-0.024, 1.268, 0.03]);
    const pulm = tube([[0.012, 1.27, 0.06], [0.015, 1.3, 0.05], [0.025, 1.32, 0.025], [0.045, 1.312, 0.005]], 0.0085, 20, 10);
    addPart('heart', null, 'circulatory', [bumpify(heart, 0.0008, 120), atL, atR, pulm], '#b3262e');
  }
  addPart('aorta', null, 'circulatory', [varTube([[0.0, 1.27, 0.04], [-0.002, 1.31, 0.04], [0.0, 1.345, 0.03], [0.018, 1.36, 0.0], [0.028, 1.345, -0.028], [0.026, 1.30, -0.035], [0.02, 1.2, -0.035], [0.012, 1.1, -0.02], [0.006, 1.0, -0.005], [0.0, 0.965, 0.0]], (t) => 0.0115 - 0.0035 * t, 120, 14, 0.01)], '#d32f2f');
  addPart('vena_cava', null, 'circulatory', [
    tube([[-0.03, 1.405, 0.022], [-0.026, 1.34, 0.03], [-0.022, 1.285, 0.034]], 0.0088, 24, 12),
    tube([[-0.022, 1.24, 0.025], [-0.022, 1.18, 0.0], [-0.02, 1.1, -0.01], [-0.017, 1.0, -0.005], [-0.01, 0.962, 0.002]], 0.0098, 60, 12),
  ], '#3f51b5');
  both((s, side) => {
    const carotid = s > 0
      ? [[0.012, 1.355, 0.01], [0.022, 1.42, 0.025], [0.026, 1.5, 0.025], [0.03, 1.58, 0.005]]
      : [[0.002, 1.35, 0.03], [-0.015, 1.40, 0.03], [-0.022, 1.45, 0.028], [-0.026, 1.5, 0.025], [-0.03, 1.58, 0.005]];
    addPart('carotid', side, 'circulatory', [tube(carotid, 0.0042, 40, 8)], '#d32f2f');
    const start = s > 0 ? [[0.022, 1.36, -0.005]] : [[0.002, 1.35, 0.03], [-0.015, 1.40, 0.03]];
    addPart('brachial_artery', side, 'circulatory', [varTube([...start, [s * 0.06, 1.425, 0.004], [s * 0.12, 1.41, -0.004], [s * 0.17, 1.36, 0.004], [s * 0.205, 1.22, 0.009], [s * 0.238, 1.12, 0.012], [s * 0.262, 1.0, 0.012], [s * 0.286, 0.88, 0.012], [s * 0.29, 0.83, 0.01]], (t) => 0.0042 - 0.0016 * t, 90, 8)], '#d32f2f');
    addPart('femoral_artery', side, 'circulatory', [varTube([[0, 0.966, 0.0], [s * 0.03, 0.94, 0.006], [s * 0.06, 0.9, 0.02], [s * 0.086, 0.85, 0.04], [s * 0.1, 0.75, 0.035], [s * 0.1, 0.6, 0.01], [s * 0.095, 0.5, -0.025], [s * 0.095, 0.4, -0.02], [s * 0.095, 0.2, -0.01], [s * 0.09, 0.08, 0.0], [s * 0.095, 0.04, 0.06]], (t) => 0.0062 - 0.0035 * t, 120, 8)], '#d32f2f');
  });
  addPart('spleen', null, 'circulatory', [ellipsoid(0.022, 0.042, 0.014, [0.1, 1.11, -0.035], [0, -0.6, -0.4], [24, 20], (v) => { if (v.x < 0) v.x *= 0.6; })], '#7b2340');

  // =================================================================== DIGESTIVE
  addPart('esophagus', null, 'digestive', [tube([[0, 1.49, 0.022], [0, 1.42, 0.004], [0.004, 1.33, -0.012], [0.01, 1.22, -0.012], [0.024, 1.145, -0.002], [0.035, 1.128, 0.004]], 0.0066, 60, 10)], '#d98c8c');
  addPart('stomach', null, 'digestive', [bumpify(varTube([[0.035, 1.128, 0.004], [0.06, 1.152, 0.006], [0.085, 1.125, 0.02], [0.088, 1.07, 0.04], [0.07, 1.03, 0.055], [0.035, 1.016, 0.06], [0.0, 1.03, 0.055], [-0.018, 1.045, 0.045]], profileFn([[0, 0.011], [0.12, 0.032], [0.35, 0.036], [0.6, 0.03], [0.85, 0.018], [1, 0.011]]), 80, 20, 0.02), 0.0008, 200)], '#d98a7d');
  addPart('liver', null, 'digestive', [bumpify(ellipsoid(1, 1, 1, [0, 0, 0], null, [56, 40], (v) => {
    let x = v.x * 0.11, y = v.y * 0.058, z = v.z * 0.075;
    const f = 1 - 0.68 * smooth((x + 0.02) / 0.13);
    y *= f; z *= 1 - 0.3 * smooth((x + 0.02) / 0.13);
    if (y < 0) y *= 0.55;
    y -= 0.25 * z * (y < 0 ? 1 : 0.3);
    v.set(x, y, z);
  }), 0.0008, 90)], '#8b3a2a');
  // liver geometry was built at origin - move it into place
  { const m = parts.get('liver'); m.position.add(new THREE.Vector3(-0.035, 1.108, 0.017)); m.userData.home.pos.copy(m.position); }
  addPart('gallbladder', null, 'digestive', [ellipsoid(0.011, 0.024, 0.011, [-0.045, 1.058, 0.068], [0.5, 0, -0.3], [20, 16], (v) => { if (v.y > 0) { v.x *= 1 - 0.4 * v.y; v.z *= 1 - 0.4 * v.y; } })], '#3c8d40');
  addPart('pancreas', null, 'digestive', [bumpify(varTube([[-0.035, 1.035, 0.02], [-0.01, 1.05, 0.0], [0.03, 1.065, -0.01], [0.07, 1.08, -0.02], [0.095, 1.09, -0.025]], profileFn([[0, 0.014], [0.25, 0.011], [0.7, 0.009], [1, 0.007]]), 50, 14, 0.06), 0.0012, 300)], '#e8b77a');
  {
    const pts = [[-0.018, 1.045, 0.045], [-0.04, 1.04, 0.03], [-0.046, 1.0, 0.02], [-0.03, 0.982, 0.015], [0.0, 0.985, 0.01], [0.025, 1.0, 0.018], [0.045, 1.018, 0.04]];
    const rows = 5;
    for (let r = 0; r < rows; r++) {
      const y = 1.018 - r * 0.02;
      for (let k = 0; k <= 6; k++) {
        const u = k / 6, dir = r % 2 === 0 ? 1 : -1;
        const x = dir > 0 ? 0.06 - u * 0.125 : -0.065 + u * 0.125;
        pts.push([x, y + 0.006 * Math.sin(k * 2.1 + r), k % 2 === 0 ? 0.072 : 0.036]);
      }
    }
    pts.push([-0.055, 0.935, 0.04], [-0.07, 0.94, 0.032]);
    addPart('small_intestine', null, 'digestive', [varTube(pts, () => 0.0105, 700, 10, 0.005)], '#e8a28f');
  }
  addPart('large_intestine', null, 'digestive', [varTube([[-0.072, 0.925, 0.03], [-0.085, 0.95, 0.03], [-0.09, 1.0, 0.026], [-0.09, 1.05, 0.026], [-0.08, 1.078, 0.04], [-0.04, 1.068, 0.078], [0.0, 1.05, 0.083], [0.04, 1.062, 0.078], [0.085, 1.092, 0.036], [0.098, 1.05, 0.02], [0.098, 0.98, 0.02], [0.09, 0.93, 0.03], [0.06, 0.905, 0.05], [0.03, 0.912, 0.04], [0.01, 0.9, 0.0], [0.0, 0.88, -0.045], [0.0, 0.84, -0.035]],
    (t) => profileFn([[0, 0.022], [0.1, 0.018], [0.7, 0.014], [0.85, 0.013], [0.92, 0.017], [1, 0.008]])(t) * (1 + 0.1 * Math.sin(t * Math.PI * 2 * 48)), 500, 14, 0.015)], '#c98a70');
  addPart('appendix', null, 'digestive', [tube([[-0.074, 0.925, 0.03], [-0.068, 0.905, 0.035], [-0.058, 0.895, 0.03], [-0.052, 0.9, 0.022]], 0.0034, 16, 8)], '#c98a70');

  // =================================================================== URINARY & ENDOCRINE
  both((s, side) => {
    const y = s > 0 ? 1.04 : 1.022;
    addPart('kidney', side, 'urinary', [ellipsoid(0.021, 0.048, 0.018, [s * 0.068, y, -0.045], [0, s * 0.35, s * 0.2], [32, 28], (v) => {
      if (s * v.x < 0 && Math.abs(v.y) < 0.45) v.x *= 1 - 0.55 * (1 - Math.abs(v.y) / 0.45);
    })], '#8e2c2c');
    addPart('ureter', side, 'urinary', [tube([[s * 0.052, y - 0.012, -0.035], [s * 0.048, 0.97, -0.03], [s * 0.05, 0.92, -0.02], [s * 0.045, 0.885, 0.0], [s * 0.022, 0.872, 0.028]], 0.0025, 40, 6)], '#e0b060');
    addPart('adrenal', side, 'endocrine', [latheBetween([s * 0.06, y + 0.042, -0.045], [s * 0.056, y + 0.062, -0.045], CONE, 0.013, 12, 1, 0.45)], '#c79a3a');
  });
  addPart('bladder', null, 'urinary', [ellipsoid(0.034, 0.03, 0.03, [0, 0.875, 0.028], null, [28, 20], (v) => { if (v.y > 0.3) v.y = 0.3 + (v.y - 0.3) * 0.6; })], '#e0b060');
  addPart('thyroid', null, 'endocrine', [
    ellipsoid(0.009, 0.02, 0.008, [0.016, 1.465, 0.035]),
    ellipsoid(0.009, 0.02, 0.008, [-0.016, 1.465, 0.035]),
    ellipsoid(0.012, 0.005, 0.004, [0, 1.458, 0.046]),
  ], '#9c6ade');

  finalizeParts(parts, systemGroups);
  return { root, parts, systemGroups };
}

// explode directions: each part moves away from the centre of its system
export function finalizeParts(parts, systemGroups) {
  const sysCenter = {};
  for (const [name, grp] of Object.entries(systemGroups)) {
    const b = new THREE.Box3().setFromObject(grp); sysCenter[name] = b.getCenter(new THREE.Vector3());
  }
  for (const m of parts.values()) {
    const u = m.userData;
    if (u.system === 'skin') { u.dir.set(0, 0, 0); continue; }
    const c = sysCenter[u.system];
    u.dir.copy(u.home.pos).sub(c);
    u.dir.y *= 0.6;
    if (u.dir.lengthSq() < 1e-6) u.dir.set(0, 0, 0.05);
  }
}
