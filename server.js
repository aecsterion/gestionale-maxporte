const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const FILE = path.join(__dirname, 'index.html');

console.log('Max Porte Gestionale — avvio server');
console.log('File index.html:', FILE);
console.log('File esiste:', fs.existsSync(FILE));
if (fs.existsSync(FILE)) {
  const stats = fs.statSync(FILE);
  console.log('Dimensione file:', stats.size, 'bytes');
  console.log('Ultima modifica:', stats.mtime);
}

const server = http.createServer((req, res) => {
  // Leggi il file ad ogni richiesta — nessuna cache
  fs.readFile(FILE, (err, data) => {
    if (err) {
      console.error('Errore lettura file:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Errore interno: ' + err.message);
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server in ascolto su porta ${PORT}`);
});
