
const express = require ('express'), 
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io") (server) 






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