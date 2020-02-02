const fs = require("fs");
const mypath = require("path");

let read = function(path = "../"){
    fs.readdir(path, (err, files) => {
    if (err) console.log(err.message);
    else{
        files.forEach(file => fs.stat(file, (err, stats)=>{
            if(stats){
                fs.readFile(file, "utf8", (err, data) => {
                    console.log(file);
                })
            }
            else{   

                
               read(mypath.join(__dirname, "../../learningNode", file));
               
            }
               
            
        }));
    }
})
}

read();