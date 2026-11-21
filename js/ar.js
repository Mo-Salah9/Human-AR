// =====================================================================
//  WebXR immersive-AR: surface detection (hit-test), placement, tap-to-select,
//  touch gestures (rotate / pinch-scale) through the DOM overlay.
// =====================================================================
import * as THREE from 'three';

export class ARManager {
  constructor({ renderer, scene, bodyRoot, overlay, onPick, onStart, onEnd, getGestureTarget, setHint }) {
    Object.assign(this, { renderer, scene, bodyRoot, overlay, onPick, onStart, onEnd, getGestureTarget, setHint });
    this.session = null;
    this.hitTestSource = null;
    this.placed = false;
    this.arScale = 0.32;
    this.raycaster = new THREE.Raycaster();
    this.tmpMat = new THREE.Matrix4();
    this.saved = null;

    // placement reticle
    const ring = new THREE.RingGeometry(0.07, 0.09, 40).rotateX(-Math.PI / 2);
    const dot = new THREE.CircleGeometry(0.015, 20).rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.9 });
    this.reticle = new THREE.Group();
    this.reticle.add(new THREE.Mesh(ring, mat), new THREE.Mesh(dot, mat));
    this.reticle.matrixAutoUpdate = false;
    this.reticle.visible = false;
    scene.add(this.reticle);

    // screen taps arrive as XR "select" events on controller 0
    this.controller = renderer.xr.getController(0);
    this.controller.addEventListener('select', () => this._onSelect());
    scene.add(this.controller);

    // don't let taps on UI buttons become XR selects
    overlay.addEventListener('beforexrselect', (e) => { if (e.target.closest && e.target.closest('.ui-block')) e.preventDefault(); });

    this._bindGestures();
  }

  static async isSupported() {
    try { return !!(navigator.xr && await navigator.xr.isSessionSupported('immersive-ar')); }
    catch { return false; }
  }

  get active() { return !!this.session; }

  async start() {
    const session = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['hit-test'],
      optionalFeatures: ['dom-overlay', 'local-floor', 'light-estimation'],
      domOverlay: { root: this.overlay },
    });
    this.session = session;
    this.saved = { pos: this.bodyRoot.position.clone(), quat: this.bodyRoot.quaternion.clone(), scale: this.bodyRoot.scale.clone() };
    this.renderer.xr.setReferenceSpaceType('local');
    await this.renderer.xr.setSession(session);
    const viewerSpace = await session.requestReferenceSpace('viewer');
    this.hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
    this.placed = false;
    this.bodyRoot.visible = false;
    session.addEventListener('end', () => this._onEnd());
    this.onStart && this.onStart();
    this.setHint && this.setHint('scan');
  }

  end() { if (this.session) this.session.end(); }

  _onEnd() {
    if (this.hitTestSource) { try { this.hitTestSource.cancel(); } catch { /* ignore */ } }
    this.hitTestSource = null;
    this.session = null;
    this.reticle.visible = false;
    this.bodyRoot.visible = true;
    if (this.saved) { this.bodyRoot.position.copy(this.saved.pos); this.bodyRoot.quaternion.copy(this.saved.quat); this.bodyRoot.scale.copy(this.saved.scale); }
    this.onEnd && this.onEnd();
  }

  reposition() { this.placed = false; this.bodyRoot.visible = false; this.setHint && this.setHint('scan'); }

  setScale(s) { this.arScale = s; if (this.placed) this.bodyRoot.scale.setScalar(s); }

  // called every frame from the main render loop
  update(frame) {
    if (!frame || !this.hitTestSource || this.placed) { this.reticle.visible = false; return; }
    const refSpace = this.renderer.xr.getReferenceSpace();
    const hits = frame.getHitTestResults(this.hitTestSource);
    if (hits.length) {
      const pose = hits[0].getPose(refSpace);
      this.reticle.visible = true;
      this.reticle.matrix.fromArray(pose.transform.matrix);
    } else this.reticle.visible = false;
  }

  _place() {
    const p = new THREE.Vector3(), q = new THREE.Quaternion(), s = new THREE.Vector3();
    this.reticle.matrix.decompose(p, q, s);
    this.bodyRoot.position.copy(p);
    this.bodyRoot.scale.setScalar(this.arScale);
    const cam = this.renderer.xr.getCamera();
    const cp = new THREE.Vector3().setFromMatrixPosition(cam.matrixWorld);
    this.bodyRoot.rotation.set(0, Math.atan2(cp.x - p.x, cp.z - p.z), 0); // face the viewer
    this.bodyRoot.visible = true;
    this.placed = true;
    this.setHint && this.setHint('placed');
  }

  _onSelect() {
    if (this._gestureMoved) { this._gestureMoved = false; return; }
    if (!this.placed) { if (this.reticle.visible) this._place(); return; }
    this.tmpMat.identity().extractRotation(this.controller.matrixWorld);
    this.raycaster.ray.origin.setFromMatrixPosition(this.controller.matrixWorld);
    this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.tmpMat);
    this.onPick && this.onPick(this.raycaster);
  }

  _bindGestures() {
    const el = this.overlay;
    let start = null;
    const isUI = (e) => e.target.closest && e.target.closest('.ui-block');
    const info = (t) => {
      if (t.length < 2) return { x: t[0].clientX, y: t[0].clientY };
      const dx = t[1].clientX - t[0].clientX, dy = t[1].clientY - t[0].clientY;
      return { x: (t[0].clientX + t[1].clientX) / 2, y: (t[0].clientY + t[1].clientY) / 2, dist: Math.hypot(dx, dy), ang: Math.atan2(dy, dx) };
    };
    el.addEventListener('touchstart', (e) => {
      if (!this.active || !this.placed || isUI(e)) return;
      const target = this.getGestureTarget();
      start = { n: e.touches.length, g: info(e.touches), rotY: target.rotation.y, scale: target.scale.x, target, x0: e.touches[0].clientX, y0: e.touches[0].clientY };
      this._gestureMoved = false;
    }, { passive: true });
    el.addEventListener('touchmove', (e) => {
      if (!start || !this.active) return;
      const g = info(e.touches);
      if (e.touches.length !== start.n) { start = { ...start, n: e.touches.length, g, rotY: start.target.rotation.y, scale: start.target.scale.x }; return; }
      if (e.touches.length === 1) {
        const dx = g.x - start.g.x;
        if (Math.abs(dx) > 6 || Math.abs(g.y - start.g.y) > 6) this._gestureMoved = true;
        start.target.rotation.y = start.rotY + dx * 0.012;
      } else if (e.touches.length === 2 && start.g.dist) {
        this._gestureMoved = true;
        const k = THREE.MathUtils.clamp(start.scale * (g.dist / start.g.dist), 0.03, 3);
        start.target.scale.setScalar(k);
        start.target.rotation.y = start.rotY - (g.ang - start.g.ang);
        if (start.target === this.bodyRoot) this.arScale = k;
      }
    }, { passive: true });
    el.addEventListener('touchend', (e) => { if (e.touches.length === 0) start = null; }, { passive: true });
  }
}
