
import fs from "fs";



switch(process.argv[2]){
    case "odd":
        for(i = 1; i<=10; i++){
            console.log(`${i}: counting: ${i+i-1}`);
        }
        break;
    case "even":
        for(i = 1; i<=10; i++){
            console.log(`${i}: counting: ${i*2}`);
        }
        break;
}
   


