const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} received.`);

  // Serve static HTML files
  if (req.method === 'GET' && req.url.endsWith('.html')) {
    const filePath = path.join(__dirname, 'public', req.url);
    serveFile(filePath, 'text/html', res);
  }
 // Serve static HTML files
  if (req.method === 'GET' && req.url.endsWith('.png')) {
    const filePath = path.join(__dirname, 'public', req.url);
    serveFile(filePath, 'text/html', res);
  }
  // Check for index.html in directories
  else if (req.method === 'GET' && !path.extname(req.url)) {
    const filePath = path.join(__dirname, 'public', req.url, 'index.html');
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        const errorFilePath = path.join(__dirname, 'public', '404', '404.html');
        serveFile(errorFilePath, 'text/html', res, 404);
      } else {
        serveFile(filePath, 'text/html', res);
      }
    });
  }

  // Handle 404 error
  else {
    const errorFilePath = path.join(__dirname, 'public', '404', '404.html');
    serveFile(errorFilePath, 'text/html', res, 404);
  }
});

function serveFile(filePath, contentType, res, statusCode = 200) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error reading file: ${err}`);
    } else {
      res.writeHead(statusCode, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
