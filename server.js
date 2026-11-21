// Simple static server for the AR Anatomy app.
//  - HTTP  on port 8080 (desktop testing via http://localhost:8080)
//  - HTTPS on port 8443 with an auto-generated self-signed certificate
//    (needed for camera + WebXR on tablets on the same Wi-Fi network).
// Usage:  npm install   then   npm start
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = __dirname;
const HTTP_PORT = process.env.PORT || 8080;
const HTTPS_PORT = process.env.HTTPS_PORT || 8443;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json',
};

function handler(req, res) {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT) || file.includes('node_modules')) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
}

function lanIPs() {
  return Object.values(os.networkInterfaces()).flat().filter((i) => i && i.family === 'IPv4' && !i.internal).map((i) => i.address);
}

http.createServer(handler).listen(HTTP_PORT, () => console.log(`HTTP : http://localhost:${HTTP_PORT}`));

(async () => {
  let selfsigned;
  try { selfsigned = require('selfsigned'); } catch {
    console.log('\n(HTTPS disabled — run "npm install" to enable HTTPS for tablets)');
    return;
  }
  const certDir = path.join(ROOT, '.cert');
  const keyFile = path.join(certDir, 'key.pem'), certFile = path.join(certDir, 'cert.pem');
  if (!fs.existsSync(keyFile)) {
    const altNames = [{ type: 2, value: 'localhost' }, { type: 7, ip: '127.0.0.1' }, ...lanIPs().map((ip) => ({ type: 7, ip }))];
    const pems = await Promise.resolve(selfsigned.generate([{ name: 'commonName', value: 'ar-anatomy.local' }], {
      days: 825, keySize: 2048, algorithm: 'sha256', extensions: [{ name: 'subjectAltName', altNames }],
    }));
    fs.mkdirSync(certDir, { recursive: true });
    fs.writeFileSync(keyFile, pems.private); fs.writeFileSync(certFile, pems.cert);
  }
  https.createServer({ key: fs.readFileSync(keyFile), cert: fs.readFileSync(certFile) }, handler).listen(HTTPS_PORT, () => {
    console.log(`HTTPS: https://localhost:${HTTPS_PORT}`);
    for (const ip of lanIPs()) console.log(`       https://${ip}:${HTTPS_PORT}   <- open this on the tablet (accept the certificate warning)`);
  });
})();
