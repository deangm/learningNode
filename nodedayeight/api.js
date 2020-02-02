const http = require("http");

const data = require("./inventory");

http.createServer((req, res) => {
		

    if(req.url === '/'){
      res.writeHead(200, {"Content-Type": "text/json"});

      let all = data.map(item => item.name);
      res.end(JSON.stringify(all));

    }
    else if(req.url === '/instock'){
      res.writeHead(200, {"Content-Type": "text/json"});
      let instock = data.filter(item => item.avail === "In stock");
      let names = instock.map(item => item.name)
      res.end(JSON.stringify(names));
      
    }
    else if(req.url === '/onbackorder'){
      res.writeHead(200, {"Content-Type": "text/json"});
      let backorder = data.filter(item => item.avail === "On backorder");
      let names = backorder.map(item => item.name)
      res.end(JSON.stringify(names));
      
    }
    else{
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.end("404 file not found")
    }
}).listen(3000);

console.log("Server listening on port 3000");
