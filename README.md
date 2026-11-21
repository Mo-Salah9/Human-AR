# التشريح بالواقع المعزز — AR Anatomy

أعضاء وأجهزة جسم تفاعلية ثلاثية الأبعاد على الجهاز اللوحي، تساعد طلبة الطب في سنتهم الأولى على دراسة التشريح طبقة تلو الأخرى.

Interactive 3D organs and body systems for tablets, helping first-year medical students study anatomy layer by layer. The app is web-based (Three.js + WebXR) and needs no install on the device.

## Features
- **140 real anatomical parts across 9 body systems**: skin, muscular, skeletal, nervous, respiratory, circulatory, digestive, urinary and endocrine.
- **A full explanation for every part** in Arabic and English, with four tabs: overview, function, clinical relevance and facts. A Latin name and a read-aloud (text-to-speech) button are included.
- **Layer-by-layer peeling**: skin → muscles → skeleton → superficial organs → deep organs.
- **Per-system controls**: show/hide, opacity, and a list of the system's parts.
- **Manipulate parts**: move, rotate and scale any part with gizmos. You can also pull it out in front of the body, isolate it, ghost it (make it transparent), hide it or reset it.
- **Explode view** to show the spatial relations between parts. The search box takes Arabic, English or Latin names.
- **AR**:
  - **WebXR** (Chrome on Android/ARCore): detects a surface, places the body at table size or life size, tap a part to select it, one-finger drag to rotate, pinch to scale.
  - **Camera mode** (iPad and others): overlays the model on the live camera feed.
- **Quiz**: two modes, "name the highlighted part" and "find and tap the part", with a score.
- **Deep links** for teachers, for example `?peel=3&select=heart&tab=clin&lang=en`.

## Running it
```bash
npm install      # one time (only needed for HTTPS)
npm start
```
- Desktop: http://localhost:8080
- Tablet on the same Wi-Fi: open the `https://<PC-IP>:8443` address the server prints, and accept the certificate warning once.
  Camera mode and WebXR AR require **HTTPS**.

For production, upload the folder as-is to any static HTTPS host, such as GitHub Pages, Netlify or Vercel.
Three.js loads from a CDN (jsDelivr), so the first load needs internet.

## 3D models
The anatomy uses **real 3D models from BodyParts3D**, which were built from scans of a real human body.
- **Coverage:** 140 parts made from 506 original meshes. These include every vertebra and rib, the 27 hand bones, muscles assembled from their real heads, color-coded brain lobes, the limbic system, ventricles, the heart and coronary vessels, and the organs.
- **Size:** about 925k triangles. They are packed into one compressed file, `models/anatomy.glb` (≈6.4 MB, meshopt + quantization).
- **Generated parts:** structures that BodyParts3D v3 doesn't include are generated from real bone landmarks. These are the spinal cord, the sciatic and median nerves, the distal arteries of the limbs, and the thyroid gland.

To rebuild the models (for example after changing `tools/manifest.mjs` or the triangle budgets):
```bash
npm install
node tools/build-models.mjs      # downloads the STL files once into tools/.cache (~670 MB)
```

**Model license:** *BodyParts3D, © The Database Center for Life Science, licensed under CC Attribution-Share Alike 2.1 Japan.*
The attribution must stay visible (it is shown in the app). Modified copies of the models must be published under the same license. The code is separate from the models.

## Structure
| File | Purpose |
|---|---|
| `index.html` / `css/style.css` | UI (RTL Arabic by default, responsive for tablets) |
| `js/main.js` | Scene, selection glow, smooth layer transitions, manipulation, quiz, camera mode |
| `js/models.js` | Loads the real models + BVH for fast picking |
| `js/anatomy.js` | Materials + a procedural fallback if the models fail to load |
| `js/data.js` | Bilingual educational content (90 entries) and UI strings |
| `js/ar.js` | WebXR: hit-test, placement, gestures |
| `tools/` | Model build pipeline |
| `server.js` | Local HTTP/HTTPS server |

> النماذج مبسطة لأغراض تعليمية ولا تغني عن الأطالس التشريحية ومختبر التشريح.
