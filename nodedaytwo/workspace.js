const EventEmitter = require('events');

// class MyEmitter extends EventEmitter{}

// const myEmitter = new MyEmitter();

// myEmitter.on("messageLogged" , () => {
//     console.log("Logged");
   
// })

// myEmitter.on("eventWithArgs" , (a, b) => {
//     console.log(a, b);
//     console.log(this);
   
// })

// myEmitter.on("eventWithArgs2" , function(a,b) {
//     console.log(a, b);
//     console.log(this);
   
// })

// myEmitter.emit('messageLogged');
// myEmitter.emit('eventWithArgs', 'first', 'second');
// myEmitter.emit('eventWithArgs2', 'first', 'second');

class Robot extends EventEmitter{
    constructor (name) {
        super();
        this.name = name;
        this.active = false;

        this.once("activate", () => {
            this.active = true;
            console.log(`${this.name} has been activated`)
        });

        this.on("speak", said => {
            if(this.active){
                console.log(`${this.name}: ${said}`)
            }   
            else{
                console.log(`${this.name} is not active`)
            }
           
        });
    }

}

let myRobot = new Robot("mike");
let jake = new Robot("Jake");

myRobot.emit("speak", "beep")
myRobot.emit("activate");
myRobot.emit("speak", "beep")

jake.emit("activate");
jake.emit("speak", 'hahahahaha');
