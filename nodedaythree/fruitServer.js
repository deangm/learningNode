const net = require('net');  // Server Code . 



const server = net.createServer((socket) => {
    let setFruitColor = false;
    let fruits = {
        "apple":"red",
        "banana":"yello",
        "orange":"orange"
    }
    let newFruit = "";
      
    console.log('Welcome to Fruit Color Server\r\n');
    socket.setEncoding("utf8")
    socket.on('data', chunk => {
        let value = chunk.trim()
        if(value in fruits){
            socket.write(fruits[value])
        }
        else if (setFruitColor == true){
            fruits[newFruit] = value;
            setFruitColor = false;
            socket.write("got it")
        }
        else{
            setFruitColor = true;
            newFruit = value;
            socket.write("Ok tell me the color");
        }
    });

    socket.on('end', socket.end);
});

server.listen(3000, () => {
    console.log('server is up');
});


//existing plant code++