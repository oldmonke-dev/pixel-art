
// this file is all server 

const express = require ('express');
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Server Static Files in public 
app.use(express.static("public"))
/*

const subscriber = redis.createClient({
    port      : 6379,              
    host      : 'rds'} );
  
  const publisher = redis.createClient({
    port      : 6379,              
    host      : 'rds'} );

    

io.on("connection", socket =>{
    console.log("user has connected");
    socket.on("disconnect", ()=>{
        console.log("user disconnected");
    });

    // server recieves the event from first client and decides the action
    socket.on("color-update", (msg)=>{
        
        // the action here is to send message to all the clients
        io.emit("color-update", msg)
    })
    // emit that to all the clients connected
    
})

*/
function redisIn(x,y,colorinfo){


}


function redisOut(){
    // get lastest color update from the redis server 
}

io.on("connection", socket =>{
  console.log("Hello, connection made", socket.id);
  
  
 
  // on update write changes to redis
  socket.on("color-update", (x,y,colorinfo)=>{
 
    console.log(x,y,colorinfo);
  })

  // emit redis changes to all clients
 // socket.emit('canvas-sync', )
})



server.listen(3000)