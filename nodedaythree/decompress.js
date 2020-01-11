const zip = require("zlib");
const fs = require("fs");
const gzip = zip.createGzip();
const gunzip = zip.createGunzip();


const input2 = fs.createReadStream('another.gz');
const output2 = fs.createWriteStream('another.txt');

input2.pipe(gunzip).pipe(output2);