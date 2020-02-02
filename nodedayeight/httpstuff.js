const https = require('https');
const fs = require('fs');

const options = {
    hostname: 'en.wikipedia.org',
    port: '443',
    path: '/wiki/George_Washington',
    method: 'GET'
}

const req = https.request(options, res => {
    
    let responseBody = "";
    res.setEncoding('utf8')

    console.log('Response from server started');
    console.log(`serverStatus: ${res.statusCode}`);
    console.log(`Response headers: %j`, res.headers);
    res.once('data', chunk => {
        console.log(chunk);
    });
    res.on('data', chunk => {
        console.log(`----chunk----${chunk.length}`);
        responseBody += chunk;
    });
    res.on('end', () => {
        fs.writeFile('geroge-washington.html', responseBody, err => {
            if (err) throw err;
            console.log("file downloaded") 
        })
    })

    

});

req.end();