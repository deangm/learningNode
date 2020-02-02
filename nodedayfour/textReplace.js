const fs = require("fs");

const regex = new RegExp;
let myregex = /\bbacon\b/gi;

let fileToRead = "./thing.txt"
let fileToWrite = "./tasty.txt"

fs.readFile(fileToRead, "utf8", (err, data) => {
    if (err) throw err;
    
    let words = data.split(" ");
    let newWords = words.map(word => {
    if(word.toLowerCase().match(myregex)){
            return "tasty";
        }
    else{
        return word;
    }
   
    });
    fs.writeFile(fileToWrite, newWords.join(" "), (err) => {
        if(err) throw err;
        console.log("done writing bacon stuff")
    })
    
})

