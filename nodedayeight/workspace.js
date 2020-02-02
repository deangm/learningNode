const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    if(req.url === '/') {
        fs.readFile('./public/index.html', 'utf8', (err, html) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        });
    }
    else if (req.url.match(/.css$/)) {
        const cssPath = path.join(__dirname, 'public', req.url);
        let fileStream = fs.createReadStream(cssPath, 'utf8');

        res.writeHead(200, {'Content-Type': 'text/css'});
        fileStream.pipe(res);
    }
    else if(req.url.match(/.jpg$/)){
        const imgPath = path.join(__dirname, 'public', req.url);
        let fileStream = fs.createReadStream(imgPath);

        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        fileStream.pipe(res);
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 File not found');
    }

}).listen(3000);

console.log('Server listening on port 3000');