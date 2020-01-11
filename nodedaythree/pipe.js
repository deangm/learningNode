const zip = require("zlib");
const fs = require("fs");
const gzip = zip.createGzip();
const gunzip = zip.createGunzip();

const inputStream = fs.createReadStream('new.txt');
const outputStream = fs.createWriteStream('another.gz');
inputStream.pipe(gzip).pipe(outputStream);


