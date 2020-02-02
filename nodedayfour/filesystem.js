const fs = require('fs');

// fs.readdir("../nodedayone", (err, files) => {
//     if(err) throw err;
//     console.log(files);
// });

// try{
//     let dir = fs.readdirSync("../nodedaytwo");
//     console.log(dir);
// }
// catch(e){
//     console.log(e.message);
// }

fs.readFile("../nodedayone/even.js",  "utf8",(err, data) => {
    if(err) console.log(err.message)
    else{
        console.log(data);
    }
})

fs.writeFile("./test.txt", "writing a message from async write function",(err) => {
    if(err) throw err;
    console.log("done");
})