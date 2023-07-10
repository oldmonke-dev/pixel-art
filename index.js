
// this file is all server side. 
// add redis code here as well, so we a user does an event on client side it is published to redis. 
// implement publisher and suscriber 

const express = require ('express');
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);






app.use(express.static("public"))



/*

io.on("connection", socket =>{
    socket.emit("canvas", canvas)
    socket.on("color",data => {
        canvas[data.row -1] [data.col -1] = data.color
        io.emit ("canvas", canvas)
    })
})
*/



server.listen(3000)