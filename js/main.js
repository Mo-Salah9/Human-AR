import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { buildAnatomy } from './anatomy.js';
import { loadAnatomy, buildBVHInBackground } from './models.js';
import { SYSTEMS, PARTS, UI, PEEL_LEVELS, LAYER_NAMES } from './data.js';
import { ARManager } from './ar.js';

// ------------------------------------------------------------------ state
const state = {
  lang: new URLSearchParams(location.search).get('lang') || localStorage.getItem('anat-lang') || 'ar',
  selected: null,
  peel: 0,
  explode: 0,
  systemOn: {}, systemOpacity: {},
  hidden: new Set(), ghost: new Set(), isolated: null,
  tab: 'desc',
  tmode: null,
  mode: 'view', // view | camera | ar
  autoRotate: false,
  labels: false,
  quiz: null,
};
for (const [k, s] of Object.entries(SYSTEMS)) { state.systemOn[k] = true; state.systemOpacity[k] = s.opacity; }

const $ = (id) => document.getElementById(id);
const t = (k) => UI[state.lang][k] ?? k;

// ------------------------------------------------------------------ renderer / scene
const viewport = $('viewport');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.setClearColor(0x000000, 0);
renderer.xr.enabled = true;
viewport.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
Object.assign(labelRenderer.domElement.style, { position: 'absolute', top: '0', left: '0', pointerEvents: 'none' });
viewport.appendChild(labelRenderer.domElement);

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 50);
const HOME_CAM = new THREE.Vector3(0, 0.98, 3.05), HOME_TARGET = new THREE.Vector3(0, 0.86, 0);
camera.position.copy(HOME_CAM);

// studio lighting: soft key, cool fill, warm-white rim
scene.add(new THREE.HemisphereLight(0xe8f0ff, 0x1c1826, 0.55));
const key = new THREE.DirectionalLight(0xfff4e8, 1.9); key.position.set(1.4, 2.6, 2.2); scene.add(key);
const fill = new THREE.DirectionalLight(0x9fc3ff, 0.55); fill.position.set(-2, 1.2, 1.5); scene.add(fill);
const rim = new THREE.DirectionalLight(0xc9dcff, 1.3); rim.position.set(-1.2, 2.0, -2.4); scene.add(rim);
const rim2 = new THREE.DirectionalLight(0xffe2d0, 0.6); rim2.position.set(1.6, 1.0, -2.0); scene.add(rim2);

// floor / stage
const stage = new THREE.Group();
{
  const disc = new THREE.Mesh(new THREE.CircleGeometry(0.75, 64).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.035 }));
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.73, 0.75, 96).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.28 }));
  const grid = new THREE.PolarGridHelper(0.72, 12, 6, 64, 0x38bdf8, 0x38bdf8);
  grid.material.transparent = true; grid.material.opacity = 0.07;
  // soft contact shadow under the feet
  const sh = document.createElement('canvas'); sh.width = sh.height = 128;
  const sctx = sh.getContext('2d'), grd = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(0,0,0,0.55)'); grd.addColorStop(0.5, 'rgba(0,0,0,0.25)'); grd.addColorStop(1, 'rgba(0,0,0,0)');
  sctx.fillStyle = grd; sctx.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.42).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sh), transparent: true, depthWrite: false }));
  shadow.position.y = 0.002;
  stage.add(disc, ring, grid, shadow);
  stage.position.y = 0.001;
}
scene.add(stage);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(HOME_TARGET);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 0.12;
controls.maxDistance = 6;
controls.autoRotateSpeed = 1.2;
controls.update();

const tc = new TransformControls(camera, renderer.domElement);
tc.setSize(0.85);
tc.addEventListener('dragging-changed', (e) => { controls.enabled = !e.value; if (!e.value) justDragged = true; });
tc.addEventListener('objectChange', () => { if (state.selected) syncManual(state.selected); });
scene.add(tc);
let justDragged = false;

// ------------------------------------------------------------------ post-processing (selection glow)
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const outline = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
Object.assign(outline, { edgeStrength: 5, edgeGlow: 0.9, edgeThickness: 1.6, pulsePeriod: 2.6 });
outline.visibleEdgeColor.set('#38bdf8'); outline.hiddenEdgeColor.set('#1d4ed8');
composer.addPass(outline);
composer.addPass(new OutputPass());

// ------------------------------------------------------------------ anatomy (real models, procedural fallback)
const loadBar = $('loadBar'), loadPct = $('loadPct');
let anatomy;
try {
  anatomy = await loadAnatomy('models/anatomy.glb', PARTS, (p) => {
    const v = Math.round(Math.min(1, p) * 100); loadBar.style.width = v + '%'; loadPct.textContent = v + '%';
  });
} catch (err) {
  console.warn('Real models unavailable, using procedural anatomy', err);
  anatomy = buildAnatomy(PARTS);
}
const { root: body, parts } = anatomy;
scene.add(body);
const partList = [...parts.values()];
if (anatomy.real) buildBVHInBackground(parts);

const selLabel = new CSS2DObject(Object.assign(document.createElement('div'), { className: 'part-label' }));
selLabel.visible = false;
const smallLabels = new Map();

// ------------------------------------------------------------------ naming helpers
function partName(m, lang = state.lang) {
  const u = m.userData, d = PARTS[u.key];
  let n = d ? d.name[lang] : u.key;
  if (u.side) n += ` (${UI[lang][u.side === 'l' ? 'left' : 'right']})`;
  return n;
}
const partLayer = (m) => m.userData.layer || SYSTEMS[m.userData.system].layer;
for (const m of partList) m.userData.layer = partLayer(m);

// ------------------------------------------------------------------ visibility & materials
function isShown(m) {
  const u = m.userData;
  if (state.isolated) return state.isolated.has(u.id);
  return state.systemOn[u.system] && u.layer > state.peel && !state.hidden.has(u.id);
}
function applyOpacity(m) {
  const u = m.userData, mat = m.material;
  const o = (state.ghost.has(u.id) ? 0.22 : state.systemOpacity[u.system]) * (u.fade ?? 1);
  const transparent = o < 0.999;
  if (mat.transparent !== transparent) mat.needsUpdate = true;
  mat.transparent = transparent;
  mat.opacity = o;
  mat.depthWrite = !transparent;
}
// parts fade in/out smoothly instead of popping (see updateFades in the render loop)
function refresh(instant = false) {
  for (const m of partList) {
    const u = m.userData;
    u.target = isShown(m) ? 1 : 0;
    if (instant || u.fade === undefined) u.fade = u.target;
    m.visible = u.fade > 0.004 || u.target > 0;
    applyOpacity(m);
  }
  if (state.selected && !state.selected.userData.target) select(null);
  updateSmallLabels();
  renderSystemsList();
  $('peelLabel').textContent = PEEL_LEVELS[state.lang][state.peel];
  [...$('peelSteps').children].forEach((el, i) => el.classList.toggle('on', i === state.peel));
}

function updateFades(dt) {
  const k = dt / 0.35;
  for (const m of partList) {
    const u = m.userData;
    if (u.fade === u.target) continue;
    u.fade = u.target > u.fade ? Math.min(u.target, u.fade + k) : Math.max(u.target, u.fade - k);
    m.visible = u.fade > 0.004;
    applyOpacity(m);
  }
}

function applyPosition(m) {
  const u = m.userData;
  m.position.copy(u.home.pos).addScaledVector(u.dir, state.explode * 1.6).add(u.manual);
}
function syncManual(m) {
  const u = m.userData;
  u.manual.copy(m.position).sub(u.home.pos).addScaledVector(u.dir, -state.explode * 1.6);
}
function resetPart(m) {
  const u = m.userData;
  u.manual.set(0, 0, 0); u.pulled = false;
  m.quaternion.copy(u.home.quat); m.scale.copy(u.home.scale);
  applyPosition(m);
}

// ------------------------------------------------------------------ selection
function setHighlight(m, on) {
  if (!m) return;
  m.material.emissive.set(on ? 0x2f7bff : 0x000000);
  m.material.emissiveIntensity = on ? 0.08 : 0;
  outline.selectedObjects = on ? [m] : outline.selectedObjects.filter((o) => o !== m);
}

function select(m, opts = {}) {
  if (state.selected === m && !opts.force) return;
  if (state.selected) setHighlight(state.selected, false);
  state.selected = m;
  if (!m) {
    $('infoPanel').classList.add('hidden');
    tc.detach();
    if (selLabel.parent) selLabel.parent.remove(selLabel);
    selLabel.visible = false;
    renderSystemsList();
    return;
  }
  setHighlight(m, true);
  if (window.innerWidth < 900) $('layersPanel').classList.add('collapsed');
  if (!opts.quiz) {
    showInfo(m);
    selLabel.element.textContent = partName(m);
    m.geometry.computeBoundingBox();
    selLabel.position.set(0, m.geometry.boundingBox.max.y, 0);
    m.add(selLabel);
    selLabel.visible = true;
  }
  if (state.tmode && state.mode !== 'ar') { tc.attach(m); tc.setMode(state.tmode); }
  else tc.detach();
  renderSystemsList();
  $('hint').classList.add('gone');
}

function showInfo(m) {
  const u = m.userData, d = PARTS[u.key], L = state.lang;
  $('infoPanel').classList.remove('hidden');
  $('infoSystem').textContent = SYSTEMS[u.system][L];
  $('infoSystem').style.color = SYSTEMS[u.system].color;
  $('infoSystem').style.background = SYSTEMS[u.system].color + '26';
  $('infoLayer').textContent = `${t('layer')} ${u.layer}: ${LAYER_NAMES[L][u.layer - 1]}`;
  $('infoTitle').textContent = partName(m);
  $('infoSub').textContent = d ? `${d.latin}${L === 'ar' ? ' — ' + d.name.en : ''}` : '';
  renderInfoBody();
  updateActionButtons();
}
function renderInfoBody() {
  const m = state.selected; if (!m) return;
  const d = PARTS[m.userData.key], L = state.lang, body = $('infoBody');
  [...$('infoTabs').children].forEach((b) => b.classList.toggle('active', b.dataset.tab === state.tab));
  if (!d) { body.textContent = ''; return; }
  if (state.tab === 'facts') {
    body.innerHTML = '<ul>' + d.facts[L].map((f) => `<li>${escapeHtml(f)}</li>`).join('') + '</ul>';
  } else {
    body.textContent = d[state.tab][L];
  }
  body.scrollTop = 0;
}
function updateActionButtons() {
  const m = state.selected; if (!m) return;
  const q = (a) => document.querySelector(`[data-act="${a}"] span`);
  q('isolate').textContent = state.isolated ? t('unisolate') : t('isolate');
  q('ghost').textContent = state.ghost.has(m.userData.id) ? t('solid') : t('ghost');
  q('pull').textContent = m.userData.pulled ? t('putBack') : t('pullOut');
  q('speak').textContent = speechSynthesis.speaking ? t('stop') : t('speak');
  document.querySelectorAll('[data-tmode]').forEach((b) => b.classList.toggle('active', b.dataset.tmode === state.tmode));
  const manipEl = document.querySelector('.actions.manip');
  manipEl.style.display = state.mode === 'ar' ? 'none' : '';
}
const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ------------------------------------------------------------------ picking
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
function pickFromRay(rc) {
  const candidates = partList.filter((m) => m.visible && m.userData.target);
  const hits = rc.intersectObjects(candidates, false);
  if (!hits.length) return null;
  const solid = hits.find((h) => h.object.material.opacity >= 0.5);
  return (solid || hits[0]).object;
}
function pickAt(x, y) {
  const r = renderer.domElement.getBoundingClientRect();
  ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  return pickFromRay(raycaster);
}
function handlePick(m) {
  if (state.quiz && state.quiz.type === 'find' && !state.quiz.answered) { if (m) answerFind(m); return; }
  if (state.quiz && state.quiz.type === 'name' && !state.quiz.answered) return;
  select(m);
}

let down = null, lastTap = 0;
renderer.domElement.addEventListener('pointerdown', (e) => {
  down = { x: e.clientX, y: e.clientY, gizmo: tc.axis !== null && tc.object };
});
renderer.domElement.addEventListener('pointerup', (e) => {
  if (!down) return;
  const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
  const wasGizmo = down.gizmo || justDragged;
  down = null; justDragged = false;
  if (moved > 6 || wasGizmo || state.mode === 'ar') return;
  const m = pickAt(e.clientX, e.clientY);
  const now = performance.now();
  if (m && m === state.selected && now - lastTap < 350) focusOn(m);
  lastTap = now;
  handlePick(m);
});
// hover tooltip (mouse only)
const tooltip = $('tooltip');
let hoverRaf = 0;
renderer.domElement.addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse' || down) { tooltip.style.display = 'none'; return; }
  if (hoverRaf) return;
  hoverRaf = requestAnimationFrame(() => {
    hoverRaf = 0;
    const m = pickAt(e.clientX, e.clientY);
    if (m && !(state.quiz && !state.quiz.answered)) {
      tooltip.textContent = partName(m);
      tooltip.style.display = 'block';
      tooltip.style.left = e.clientX + 14 + 'px';
      tooltip.style.top = e.clientY + 12 + 'px';
      renderer.domElement.style.cursor = 'pointer';
    } else { tooltip.style.display = 'none'; renderer.domElement.style.cursor = ''; }
  });
});
renderer.domElement.addEventListener('pointerleave', () => { tooltip.style.display = 'none'; });

// ------------------------------------------------------------------ camera animation
let camAnim = null;
function animateCamera(toPos, toTarget, dur = 700) {
  camAnim = { p0: camera.position.clone(), t0: controls.target.clone(), p1: toPos, t1: toTarget, start: performance.now(), dur };
}
function focusOn(m) {
  if (state.mode === 'ar') return;
  const box = new THREE.Box3().setFromObject(m);
  const c = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3()).length();
  const dist = Math.max(size * 2.8, 0.42);
  const dir = camera.position.clone().sub(controls.target).normalize();
  animateCamera(c.clone().addScaledVector(dir, dist), c);
}
function resetView() { animateCamera(HOME_CAM.clone(), HOME_TARGET.clone()); }

// ------------------------------------------------------------------ actions
function doAction(act) {
  const m = state.selected; if (!m) return;
  const id = m.userData.id;
  switch (act) {
    case 'focus': focusOn(m); break;
    case 'isolate':
      if (state.isolated) state.isolated = null;
      else { state.isolated = new Set([id]); toast(t('isolatedMsg')); focusOn(m); }
      refresh(); break;
    case 'hide': state.hidden.add(id); toast(t('hiddenMsg')); select(null); refresh(); break;
    case 'ghost': state.ghost.has(id) ? state.ghost.delete(id) : state.ghost.add(id); refresh(); break;
    case 'pull': {
      const u = m.userData;
      if (u.pulled) { resetPart(m); }
      else {
        u.pulled = true;
        // bring the part in front of the body, at chest height
        const target = new THREE.Vector3(0, Math.max(0.5, Math.min(1.5, u.home.pos.y)), 0.45);
        u.manual.copy(target).sub(u.home.pos).addScaledVector(u.dir, -state.explode * 1.6);
        applyPosition(m);
        setTimeout(() => focusOn(m), 30);
      }
      break;
    }
    case 'speak': speak(m); break;
    case 'resetPart': resetPart(m); break;
  }
  updateActionButtons();
}

function speak(m) {
  if (speechSynthesis.speaking) { speechSynthesis.cancel(); updateActionButtons(); return; }
  const d = PARTS[m.userData.key], L = state.lang;
  const text = `${partName(m)}. ${d.desc[L]} ${d.func[L]}`;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = L === 'ar' ? 'ar-SA' : 'en-US';
  const voices = speechSynthesis.getVoices();
  const v = voices.find((x) => x.lang && x.lang.toLowerCase().startsWith(L));
  if (v) u.voice = v; else if (voices.length) toast(t('noVoice'));
  u.rate = L === 'ar' ? 0.95 : 1;
  u.onend = updateActionButtons;
  speechSynthesis.speak(u);
  setTimeout(updateActionButtons, 100);
}

function setTransformMode(mode) {
  state.tmode = state.tmode === mode ? null : mode;
  if (state.selected && state.tmode) { tc.attach(state.selected); tc.setMode(state.tmode); }
  else tc.detach();
  updateActionButtons();
}

function showAll() {
  state.hidden.clear(); state.isolated = null; state.ghost.clear();
  for (const k of Object.keys(SYSTEMS)) state.systemOn[k] = true;
  refresh(); updateActionButtons();
}
function resetAll() {
  showAll();
  state.peel = 0; $('peelSlider').value = 0;
  state.explode = 0; $('explodeSlider').value = 0;
  for (const [k, s] of Object.entries(SYSTEMS)) state.systemOpacity[k] = s.opacity;
  for (const m of partList) resetPart(m);
  select(null); refresh(); resetView();
}

// make sure a part becomes visible when chosen from a list / search
function revealAndSelect(m) {
  const u = m.userData;
  if (state.isolated && !state.isolated.has(u.id)) state.isolated = null;
  state.hidden.delete(u.id);
  state.systemOn[u.system] = true;
  // peel away the layers that cover this part (skin/muscles over bones, etc.)
  state.peel = Math.min(u.layer - 1, 4); $('peelSlider').value = state.peel;
  refresh();
  select(m, { force: true });
  focusOn(m);
}

// ------------------------------------------------------------------ UI: systems list
const openSystems = new Set();
function renderSystemsList() {
  const wrap = $('systemsList'); const L = state.lang;
  const scrollPos = wrap.parentElement.parentElement.scrollTop;
  wrap.innerHTML = '';
  for (const [key, sys] of Object.entries(SYSTEMS)) {
    const ps = partList.filter((m) => m.userData.system === key)
      .sort((a, b) => partName(a).localeCompare(partName(b), L));
    const row = document.createElement('div');
    row.className = 'sys-row' + (openSystems.has(key) ? ' open' : '') + (state.systemOn[key] ? '' : ' off');
    row.innerHTML = `
      <div class="sys-top">
        <span class="sys-dot" style="background:${sys.color};color:${sys.color}"></span>
        <span class="sys-name">${sys[L]}</span>
        <span class="sys-count">${ps.length}</span>
        <label class="switch"><input type="checkbox" ${state.systemOn[key] ? 'checked' : ''}><span></span></label>
        <button class="expand">▾</button>
      </div>
      <div class="sys-op"><span>${t('opacity')}</span><input type="range" min="0.05" max="1" step="0.01" value="${state.systemOpacity[key]}"></div>
      <div class="part-list"></div>`;
    row.querySelector('input[type=checkbox]').addEventListener('change', (e) => { state.systemOn[key] = e.target.checked; refresh(); });
    row.querySelector('input[type=range]').addEventListener('input', (e) => {
      state.systemOpacity[key] = parseFloat(e.target.value);
      for (const m of ps) applyOpacity(m);
    });
    const toggle = () => { openSystems.has(key) ? openSystems.delete(key) : openSystems.add(key); row.classList.toggle('open'); };
    row.querySelector('.expand').addEventListener('click', toggle);
    row.querySelector('.sys-name').addEventListener('click', toggle);
    const list = row.querySelector('.part-list');
    for (const m of ps) {
      const b = document.createElement('button');
      if (m === state.selected) b.className = 'sel';
      b.innerHTML = `<span>${escapeHtml(partName(m))}</span><small>${m.visible ? '' : '○'}</small>`;
      b.addEventListener('click', () => revealAndSelect(m));
      list.appendChild(b);
    }
    wrap.appendChild(row);
  }
  wrap.parentElement.parentElement.scrollTop = scrollPos;
}

// ------------------------------------------------------------------ UI: search
$('searchInput').addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  const res = $('searchResults'); res.innerHTML = '';
  if (!q) return;
  const found = partList.filter((m) => {
    const d = PARTS[m.userData.key];
    return d && (d.name.ar.includes(q) || d.name.en.toLowerCase().includes(q) || d.latin.toLowerCase().includes(q));
  }).slice(0, 14);
  for (const m of found) {
    const b = document.createElement('button');
    b.innerHTML = `<span>${escapeHtml(partName(m))}</span><small>${SYSTEMS[m.userData.system][state.lang]}</small>`;
    b.addEventListener('click', () => { revealAndSelect(m); res.innerHTML = ''; e.target.value = ''; });
    res.appendChild(b);
  }
});

// ------------------------------------------------------------------ UI: labels on all visible parts
function updateSmallLabels() {
  for (const [m, obj] of smallLabels) { m.remove(obj); }
  smallLabels.clear();
  if (!state.labels || state.mode === 'ar') return;
  for (const m of partList) {
    if (!m.visible || m.userData.system === 'skin' || m === state.selected) continue;
    if (m.material.opacity < 0.5) continue;
    const el = document.createElement('div'); el.className = 'part-label small'; el.textContent = partName(m);
    const obj = new CSS2DObject(el);
    obj.position.set(0, 0, 0);
    m.add(obj); smallLabels.set(m, obj);
  }
}

// ------------------------------------------------------------------ quiz
function quizPool() { return partList.filter((m) => m.visible && m.userData.system !== 'skin'); }
function startQuiz(type) {
  state.quiz = { type, score: 0, total: 0, current: null, answered: false };
  $('quizPanel').classList.remove('hidden');
  document.querySelectorAll('[data-qtype]').forEach((b) => b.classList.toggle('active', b.dataset.qtype === type));
  nextQuestion();
}
function endQuiz() {
  if (state.quiz && state.quiz.current) setHighlight(state.quiz.current, false);
  state.quiz = null;
  $('quizPanel').classList.add('hidden');
  select(null);
}
function nextQuestion() {
  const Q = state.quiz; if (!Q) return;
  if (Q.current) setHighlight(Q.current, false);
  select(null);
  const pool = quizPool();
  $('quizFeedback').textContent = ''; $('quizFeedback').className = '';
  $('quizOptions').innerHTML = '';
  if (pool.length < 4) { $('quizQuestion').textContent = t('quizNoParts'); return; }
  let m;
  do { m = pool[Math.floor(Math.random() * pool.length)]; } while (Q.current && m.userData.key === Q.current.userData.key && pool.length > 4);
  Q.current = m; Q.answered = false;
  if (Q.type === 'name') {
    $('quizQuestion').textContent = t('quizWhat');
    select(m, { quiz: true, force: true });
    focusOn(m);
    const keys = new Set([m.userData.key]);
    const same = pool.filter((p) => p.userData.system === m.userData.system && !keys.has(p.userData.key));
    const others = pool.filter((p) => !keys.has(p.userData.key));
    const opts = [m];
    for (const src of [shuffle(same), shuffle(others)]) for (const p of src) {
      if (opts.length >= 4) break;
      if (!keys.has(p.userData.key)) { keys.add(p.userData.key); opts.push(p); }
    }
    for (const o of shuffle(opts)) {
      const b = document.createElement('button');
      b.className = 'btn'; b.textContent = PARTS[o.userData.key].name[state.lang];
      b.addEventListener('click', () => answerName(o, b));
      $('quizOptions').appendChild(b);
    }
  } else {
    $('quizQuestion').textContent = t('quizWhere') + PARTS[m.userData.key].name[state.lang];
  }
  $('quizScore').textContent = `${Q.score} / ${Q.total}`;
}
function answerName(o, btn) {
  const Q = state.quiz; if (!Q || Q.answered) return;
  Q.answered = true; Q.total++;
  const ok = o.userData.key === Q.current.userData.key;
  if (ok) Q.score++;
  btn.classList.add(ok ? 'right' : 'wrong');
  if (!ok) [...$('quizOptions').children].forEach((b) => { if (b.textContent === PARTS[Q.current.userData.key].name[state.lang]) b.classList.add('right'); });
  feedback(ok);
  select(Q.current, { force: true });
}
function answerFind(m) {
  const Q = state.quiz;
  Q.answered = true; Q.total++;
  const ok = m.userData.key === Q.current.userData.key;
  if (ok) Q.score++;
  feedback(ok);
  select(Q.current, { force: true });
  if (!ok) focusOn(Q.current);
}
function feedback(ok) {
  const Q = state.quiz, f = $('quizFeedback');
  f.textContent = ok ? t('correct') : t('wrong') + PARTS[Q.current.userData.key].name[state.lang];
  f.className = ok ? 'ok' : 'bad';
  $('quizScore').textContent = `${Q.score} / ${Q.total}`;
}
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// ------------------------------------------------------------------ camera passthrough mode
let camStream = null;
async function toggleCameraMode() {
  const video = $('camfeed');
  if (state.mode === 'camera') {
    camStream && camStream.getTracks().forEach((tr) => tr.stop());
    camStream = null; video.srcObject = null;
    document.body.classList.remove('cam-mode');
    stage.visible = true; state.mode = 'view';
    $('btnCamera').classList.remove('active');
    return;
  }
  try {
    camStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 } }, audio: false });
    video.srcObject = camStream; await video.play();
    document.body.classList.add('cam-mode');
    stage.visible = false; state.mode = 'camera';
    $('btnCamera').classList.add('active');
    toast(t('camOn'));
  } catch (err) { console.error(err); toast(t('camError')); }
}

// ------------------------------------------------------------------ WebXR AR
const ar = new ARManager({
  renderer, scene, bodyRoot: body, overlay: $('overlay'),
  onPick: (rc) => handlePick(pickFromRay(rc)),
  getGestureTarget: () => (state.selected && state.selected.userData.pulled ? state.selected : body),
  setHint: (k) => { $('arHint').textContent = t(k === 'scan' ? 'arHintScan' : 'arHintPlaced'); },
  onStart: () => {
    if (state.mode === 'camera') toggleCameraMode();
    state.mode = 'ar';
    document.body.classList.add('ar-mode');
    $('arControls').classList.remove('hidden');
    $('layersPanel').classList.add('collapsed');
    stage.visible = false; tc.detach(); state.tmode = null;
    updateSmallLabels(); updateActionButtons();
  },
  onEnd: () => {
    state.mode = 'view';
    document.body.classList.remove('ar-mode');
    $('arControls').classList.add('hidden');
    stage.visible = true;
    onResize(); updateSmallLabels(); updateActionButtons();
  },
});
async function startAR() {
  if (!(await ARManager.isSupported())) { toast(t('arUnsupported'), 5000); return; }
  try { await ar.start(); } catch (err) { console.error(err); toast(t('arUnsupported'), 5000); }
}

// ------------------------------------------------------------------ toast
let toastTimer = 0;
function toast(msg, ms = 2600) {
  const el = $('toast'); el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), ms);
}

// ------------------------------------------------------------------ language
function applyLanguage() {
  const L = state.lang;
  document.documentElement.lang = L;
  document.documentElement.dir = L === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => { el.title = t(el.dataset.i18nTitle); });
  $('btnLang').textContent = L === 'ar' ? 'EN' : 'عربي';
  $('helpContent').innerHTML = t('helpHtml');
  $('peelSteps').innerHTML = PEEL_LEVELS[L].map((n) => `<span>${n}</span>`).join('');
  document.title = `${UI[L].appTitle} | ${L === 'ar' ? 'AR Anatomy' : 'التشريح بالواقع المعزز'}`;
  refresh();
  if (state.selected) { showInfo(state.selected); selLabel.element.textContent = partName(state.selected); }
  if (state.quiz) nextQuestion();
  if (ar.active) $('arHint').textContent = t(ar.placed ? 'arHintPlaced' : 'arHintScan');
}

// ------------------------------------------------------------------ wire up DOM
$('btnLang').addEventListener('click', () => { state.lang = state.lang === 'ar' ? 'en' : 'ar'; localStorage.setItem('anat-lang', state.lang); applyLanguage(); });
$('btnLayers').addEventListener('click', () => $('layersPanel').classList.toggle('collapsed'));
$('btnHelp').addEventListener('click', () => $('helpModal').classList.remove('hidden'));
$('helpClose').addEventListener('click', () => $('helpModal').classList.add('hidden'));
$('helpModal').addEventListener('click', (e) => { if (e.target.id === 'helpModal') $('helpModal').classList.add('hidden'); });
$('btnAR').addEventListener('click', startAR);
$('btnCamera').addEventListener('click', toggleCameraMode);
$('btnQuiz').addEventListener('click', () => (state.quiz ? endQuiz() : startQuiz('name')));
$('quizClose').addEventListener('click', endQuiz);
$('quizNext').addEventListener('click', nextQuestion);
document.querySelectorAll('[data-qtype]').forEach((b) => b.addEventListener('click', () => startQuiz(b.dataset.qtype)));
$('infoClose').addEventListener('click', () => select(null));
$('infoTabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { state.tab = b.dataset.tab; renderInfoBody(); } });
document.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', () => doAction(b.dataset.act)));
document.querySelectorAll('[data-tmode]').forEach((b) => b.addEventListener('click', () => setTransformMode(b.dataset.tmode)));
$('peelSlider').addEventListener('input', (e) => { state.peel = parseInt(e.target.value, 10); refresh(); });
$('explodeSlider').addEventListener('input', (e) => { state.explode = parseFloat(e.target.value); for (const m of partList) applyPosition(m); });
$('btnResetView').addEventListener('click', resetView);
$('btnShowAll').addEventListener('click', showAll);
$('btnResetAll').addEventListener('click', resetAll);
$('btnAutoRotate').addEventListener('click', (e) => { state.autoRotate = !state.autoRotate; controls.autoRotate = state.autoRotate; e.currentTarget.classList.toggle('active', state.autoRotate); });
$('btnLabels').addEventListener('click', (e) => { state.labels = !state.labels; e.currentTarget.classList.toggle('active', state.labels); updateSmallLabels(); });
$('arTable').addEventListener('click', () => ar.setScale(0.32));
$('arLife').addEventListener('click', () => ar.setScale(1));
$('arReposition').addEventListener('click', () => ar.reposition());
$('arExit').addEventListener('click', () => ar.end());
window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return;
  if (e.key === 'Escape') { select(null); state.tmode = null; tc.detach(); }
  if (e.key === 'w') setTransformMode('translate');
  if (e.key === 'e') setTransformMode('rotate');
  if (e.key === 'r') setTransformMode('scale');
  if (e.key === 'f' && state.selected) focusOn(state.selected);
  if (e.key === 'h' && state.selected) doAction('hide');
});
if (window.innerWidth < 900) $('layersPanel').classList.add('collapsed');
if (speechSynthesis && speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = () => {};

function onResize() {
  if (renderer.xr.isPresenting) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  composer.setPixelRatio(renderer.getPixelRatio());
  composer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize);
composer.setPixelRatio(renderer.getPixelRatio());

// intro: the body assembles from an exploded state while the camera glides in
let intro = null;
function playIntro() {
  const from = 0.9;
  state.explode = from; partList.forEach(applyPosition);
  for (const m of partList) { m.userData.fade = 0; }
  refresh();
  camera.position.set(1.9, 1.5, 3.9);
  animateCamera(HOME_CAM.clone(), HOME_TARGET.clone(), 2800);
  intro = { from, start: performance.now(), dur: 2600 };
}

// ------------------------------------------------------------------ render loop
const clock = new THREE.Clock();
const perf = { acc: 0, n: 0 };
renderer.setAnimationLoop((time, frame) => {
  const dt = Math.min(clock.getDelta(), 0.1);
  if (intro) {
    const k = Math.min(1, (performance.now() - intro.start) / intro.dur), e = 1 - Math.pow(1 - k, 3);
    state.explode = intro.from * (1 - e);
    partList.forEach(applyPosition);
    if (k >= 1) { intro = null; $('explodeSlider').value = 0; }
  }
  updateFades(dt);
  if (ar.active) ar.update(frame);
  else {
    if (camAnim) {
      const k = Math.min(1, (performance.now() - camAnim.start) / camAnim.dur);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      camera.position.lerpVectors(camAnim.p0, camAnim.p1, e);
      controls.target.lerpVectors(camAnim.t0, camAnim.t1, e);
      if (k >= 1) camAnim = null;
    }
    controls.update(dt);
  }
  // pulse highlight
  const m = state.selected || (state.quiz && state.quiz.current);
  if (m) m.material.emissiveIntensity = 0.05 + 0.05 * Math.sin(time * 0.005);
  if (renderer.xr.isPresenting || state.mode !== 'view') renderer.render(scene, camera);
  else composer.render(dt);
  // adaptive resolution: drop pixel ratio on slower tablets to keep interaction smooth
  if (!intro && !renderer.xr.isPresenting) {
    perf.acc += dt; perf.n++;
    if (perf.n === 90) {
      if (perf.acc / perf.n > 0.03 && renderer.getPixelRatio() > 1) { renderer.setPixelRatio(Math.max(1, renderer.getPixelRatio() - 0.5)); onResize(); }
      perf.acc = 0; perf.n = 0;
    }
  }
  if (!renderer.xr.isPresenting) labelRenderer.render(scene, camera);
});

// ------------------------------------------------------------------ boot
applyLanguage();
// deep links, e.g. ?lang=en&peel=3&explode=0.3&select=heart&tab=clin
{
  const qs = new URLSearchParams(location.search);
  if (qs.has('peel')) { state.peel = Math.max(0, Math.min(4, parseInt(qs.get('peel'), 10) || 0)); $('peelSlider').value = state.peel; refresh(); }
  if (qs.has('explode')) { state.explode = parseFloat(qs.get('explode')) || 0; $('explodeSlider').value = state.explode; partList.forEach(applyPosition); }
  if (qs.has('tab')) state.tab = qs.get('tab');
  if (qs.has('labels')) $('btnLabels').click();
  const sel = qs.get('select') && parts.get(qs.get('select'));
  if (sel) { revealAndSelect(sel); if (qs.has('instant')) { camAnim.dur = 1; } }
  if (qs.has('instant') || [...qs.keys()].length) refresh(true);
  else playIntro();
}
ARManager.isSupported().then((ok) => { if (!ok) $('btnAR').title = t('arUnsupported'); });
requestAnimationFrame(() => $('loading').classList.add('done'));
setTimeout(() => $('hint').classList.add('gone'), 9000);
