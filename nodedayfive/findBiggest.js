const zip = require("zlib");

const gzip = zip.createGzip();
const gunzip = zip.createGunzip();
const csv = require('csv-parser');
const fs = require('fs');

let file = process.argv[2];
let age = process.argv[3];
let count = 0;


const input2 = fs.createReadStream(file);
const output = fs.createWriteStream('savings.csv')

input2.pipe(gunzip).pipe(csv())
    .on('data', (row) => {
        switch (String(process.argv[4])) {
            case "matched":
                if (Number(row.age) == age) {
                    count++;
                    console.log(row);
                }
                break;
            case "greater":
                if (Number(row.age) > age) {
                    count++;
                    console.log(row);
                }
                break;
            default:
                return;


        }

    })
    .on('end', () => {
        console.log(count);
        console.log('done');
    });





