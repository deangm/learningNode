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
                console.log("Plant was watered. Plant is now " + this.size + " feet high")
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
plant.emit("water");
plant.emit("bugAttack");
plant.emit("harvest");
plant.emit("plantSeed");
plant.emit("water");
plant.emit("bugAttack");
plant.emit("water");
plant.emit("water");
plant.emit("water");
plant.emit("water");
plant.emit("water");
plant.emit("water");
plant.emit("error", "Your got an error")
plant.emit("harvest");
plant.emit("water");
