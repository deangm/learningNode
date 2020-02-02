const express = require('express');
const app=express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
let clients = 0;
io.on('connection', (socket) => {
    clients++;
    console.log('connected');
    socket.on('chat message', (msg) => {
        console.log(`message: ${msg.usr} ${msg.msg}`);
        socket.broadcast.emit('chat message', {user:msg.usr, msg:msg.msg, count:clients});
    })

    socket.on('disconnect', () => {
        clients--;
        console.log('socket disconnected')
    })
})

http.listen(3000, () =>{
    console.log("Listening on port 3000")
})