// =====================================================================
//  Loads the real anatomy (BodyParts3D, CC BY-SA 2.1 JP) from models/anatomy.glb
// =====================================================================
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { makeMaterial, finalizeParts } from './anatomy.js';

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

const SYS_COLOR = {
  skin: '#dfa88a', muscular: '#b0372f', skeletal: '#ebe2cc', nervous: '#f4d35e', respiratory: '#ef9aa4',
  circulatory: '#cf2d2d', digestive: '#dd9a84', urinary: '#e0b45a', endocrine: '#a77be0',
};
// pedagogical colours (atlas style)
export const PART_COLOR = {
  frontal_lobe: '#f0928a', parietal_lobe: '#f6c177', temporal_lobe: '#8fd19e', occipital_lobe: '#82aef5',
  insula: '#c79af7', limbic_system: '#f5a9c9', cerebrum: '#f2ebdf', corpus_callosum: '#f7f2e8', thalamus: '#8fd3c4',
  ventricles: '#4fc3f7', cerebellum: '#e7a7ae', brainstem: '#e0a58e', eye: '#f7f4ee',
  lung_r: '#ef9aa4', lung_l: '#ef9aa4', trachea: '#e8d2c2', bronchi: '#e8d2c2', larynx: '#e8d2c2', diaphragm: '#b3473f',
  heart: '#b0242c', coronary_arteries: '#e8473c', pulmonary_vessels: '#8a6bd1', vena_cava: '#3b5bdb', spleen: '#7b2340',
  esophagus: '#d9877f', stomach: '#e29a8a', liver: '#7a2d20', gallbladder: '#3f8f45', pancreas: '#e8b877',
  small_intestine: '#eaa792', large_intestine: '#cf9277', appendix: '#cf9277',
  kidney: '#8a2a2a', ureter: '#e0b45a', bladder: '#e5bb6a',
  thyroid: '#9c6ade', adrenal: '#d4a23c', pituitary: '#b07ee0', thymus: '#c9a0dc',
};

// slight per-muscle tint so neighbouring muscles are distinguishable
function tint(hex, key, amount = 0.07) {
  let h = 0; for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const c = new THREE.Color(hex), hsl = {}; c.getHSL(hsl);
  c.setHSL(hsl.h + (((h % 100) / 100) - 0.5) * 0.02, hsl.s, THREE.MathUtils.clamp(hsl.l + (((h >> 8) % 100) / 100 - 0.5) * amount, 0, 1));
  return '#' + c.getHexString();
}

export async function loadAnatomy(url, PARTS, onProgress) {
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const gltf = await new Promise((resolve, reject) => loader.load(url, resolve,
    (e) => onProgress && onProgress(e.total ? e.loaded / e.total : e.loaded / 7e6), reject));

  const root = new THREE.Group(); root.name = 'body';
  const parts = new Map(), systemGroups = {};
  const meshes = [];
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse((o) => { if (o.isMesh) meshes.push(o); });

  for (const m of meshes) {
    const ex = m.userData || {};
    const key = ex.key || m.name, side = ex.side || null, system = ex.sys || 'skeletal';
    const id = side ? `${key}_${side}` : key;
    // de-quantize positions to float (BVH + precise picking/labels)
    const g = m.geometry;
    const pa = g.attributes.position;
    if (!(pa.array instanceof Float32Array) || pa.normalized) {
      const f = new Float32Array(pa.count * 3);
      for (let i = 0; i < pa.count; i++) { f[i * 3] = pa.getX(i); f[i * 3 + 1] = pa.getY(i); f[i * 3 + 2] = pa.getZ(i); }
      g.setAttribute('position', new THREE.BufferAttribute(f, 3));
    }
    // keep the world translation; bake the quantization scale into the vertices
    const mesh = new THREE.Mesh(g);
    const sc = new THREE.Vector3();
    m.matrixWorld.decompose(mesh.position, mesh.quaternion, sc);
    g.applyMatrix4(new THREE.Matrix4().makeScale(sc.x, sc.y, sc.z));
    g.computeBoundingBox(); g.computeBoundingSphere();
    let color = PART_COLOR[key] || SYS_COLOR[system];
    if (system === 'muscular') color = tint(color, key);
    if (system === 'skeletal') color = tint(color, key, 0.04);
    mesh.material = makeMaterial(system, color, { noTextures: true, doubleSide: system === 'skin' || key === 'diaphragm' });
    mesh.name = id;
    mesh.userData = {
      id, key, side, system,
      layer: (PARTS[key] && PARTS[key].layer) || 0,
      home: { pos: mesh.position.clone(), quat: mesh.quaternion.clone(), scale: mesh.scale.clone() },
      manual: new THREE.Vector3(), dir: new THREE.Vector3(), baseColor: new THREE.Color(color),
    };
    if (!systemGroups[system]) { systemGroups[system] = new THREE.Group(); systemGroups[system].name = system; root.add(systemGroups[system]); }
    systemGroups[system].add(mesh);
    parts.set(id, mesh);
  }
  finalizeParts(parts, systemGroups);
  return { root, parts, systemGroups, real: true };
}

// Build BVH acceleration structures in idle time (one mesh per slice) for instant picking
export function buildBVHInBackground(parts) {
  const queue = [...parts.values()].sort((a, b) => a.geometry.index.count - b.geometry.index.count);
  const step = () => {
    const t0 = performance.now();
    while (queue.length && performance.now() - t0 < 12) {
      const m = queue.shift();
      if (!m.geometry.boundsTree) m.geometry.computeBoundsTree();
    }
    if (queue.length) (window.requestIdleCallback || ((f) => setTimeout(f, 16)))(step);
  };
  step();
}
