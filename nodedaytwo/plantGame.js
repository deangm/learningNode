

const EventEmitter = require('events');
class Plant extends EventEmitter{
    constructor(){
        super();
        this.size = 0;
        this.hasBeenPlanted = false;

        this.once("plantSeed", () => {
            this.size =1;
            this.hasBeenPlanted = true;
            console.log("the seed ahs been planted and is " + this.size + " feet high");
        });

        this.on("error", (err) => {
            console.log(err);
        })

        this.on("water", () => {
            if(this.hasBeenPlanted){
                this.size ++;
                this("Plant was watered. Plant is now " + this.size + " feet high")
            }
            else{
                console.log("Plant the seed yo!")
            }
        });

        this.on("bugAttack", () => {
            if(this.hasBeenPlanted){
                this.size --;
                console.log("Plant was attacked. Plant is now " + this.size + " feet high")
            }
            else{
                console.log("Plant the seed yo!")
            }
        });

        this.on("harvest", () => {
            if(this.hasBeenPlanted){
                console.log("Your plant is now " + this.size + " feet heigh and is harvested");
                this.removeAllListeners();
            }
            else{
                console.log("plant the seed YO!")
            }
        });
    }
}

let plant = new Plant();




// Get process.stdin as the standard input object.
var standard_input = process.stdin;

// Set input character encoding.
standard_input.setEncoding('utf-8');

// Prompt user to input data in console.
console.log("Please input text in command line.");

// When user input data and click enter key.
standard_input.on('data', function (data) {

    // User input exit.
    if(data === 'exit\n'){
        // Program exit.
        console.log("User input complete, program exit.");
        process.exit();
    }else
    {
        // Print user input in console.
        if(data.trim() == "plantSeed"){
            plant.emit("plantSeed");
        }
        else if(data.trim() == "water"){
            plant.emit("water");
        }
        else if(data.trim() == "bugAttack"){
            plant.emit("bugAttack");
        }
        else if(data.trim() == "harvest"){
            plant.emit("harvest");
        }
    }
});