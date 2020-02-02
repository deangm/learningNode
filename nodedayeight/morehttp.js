const http = require('http');
const fs = require('fs');
const path = require('path')


const server = http.createServer((req, res) => {


    if(req.url === '/'){
        fs.readFile('george.html', 'utf8', (err, html) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        })
    }
    else if (req.url.match(/.css$/)){
        const cssPath = path.join(__dirname, 'fileServer', 'public', req.url);
        let fileStream = fs.createReadStream(cssPath, 'utf8');

        res.writeHead(200, {'Content-Type': 'text/css'});
        fileStream.pipe(res);
    }
    else{
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("404 file not found")
    }

}).listen(3000);

console.log("server listening on port 3000");