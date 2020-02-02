const zip = require("zlib");

const gzip = zip.createGzip();
const gunzip = zip.createGunzip();
const csv = require('csv-parser');
const fs = require('fs');

// let file = process.argv[2];
// let age = process.argv[3];
let count = 0;


const input2 = fs.createReadStream('saving.csv.gz');
const output = fs.createWriteStream('saving.csv')

input2.pipe(gunzip).pipe(output)
