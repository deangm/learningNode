const csv = require('csv-parser');
const fs = require('fs');
let fileName = process.argv[2];
let state = process.argv[3];
let count = 0;

fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', (row) => {
                if (row.state == state) {
                        count++;
                        console.log(row);
                        console.log("\n")
                }
        })
        .on('end', () => {
                console.log("\n\n")
                console.log(`Total count for ${state} is: ${count}`);
                console.log("\n\n")
                console.log('done');
        }); 