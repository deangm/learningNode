file = require("fs");

let myFile = process.argv[2]

var standard_input = process.stdin;

standard_input.setEncoding('utf-8');

standard_input.on('data', function (data) {
    if(data == "print\n"){
        file.readFile(`./${myFile}`, 'utf8', (err, fileData) => {
            console.log(`\nReading Data.....\n\n${fileData}`);
        })
    }
    else if(data == "exit\n"){
        process.exit();
    }
    else{
        file.appendFile(`./${myFile}`, data, () => {
            console.log("done writing to " + myFile);
        });
    }
});




