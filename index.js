// server file  
const redis = require('redis');


const express = require ('express');
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const { get } = require('http');
const io = new Server(server);


const client = redis.createClient();
client.on('error', err => console.log('Redis Client Error', err));
 client.connect();
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
  
  
 // value of bitfields is set by increments?
  // on update write changes to redis
  socket.on("color-update", (x,y,colorinfo)=>{
    var color;

    console.log(x,y,colorinfo);
    var offset = x + 1000*y;
    switch(colorinfo) {
      case 'red':
        // code block
        color = 0;
        
        client.bitField('canvas', [{
          operation: 'SET',
          encoding: 'u2',
          offset: '#', offset,
          value: 0
        }])
        break;
        
      case 'blue':
        color = 2;
        for(let i=0;i<=color;i++) {
          client.bitField('canvas', [{
            operation: 'SET',
            encoding: 'u2',
            offset: '#',offset,
            value: i
          }])
        }
        break;
        
      case 'yellow':
        color = 3;
        
          for(let i=0;i<=color;i++) {
            client.bitField('canvas', [{
              operation: 'SET',
              encoding: 'u2',
              offset: '#',offset,
              value: i
            }]) }
        
        break;
      case 'green':
        color = 1;
        for(let i=0;i<=color;i++) {
          client.bitField('canvas', [{
            operation: 'SET',
            encoding: 'u2',
            offset: '#',offset,
            value: i
          }])}
        break;

      default:
       
        // code block
    }
    

    client.bitField('canvas', [{
      operation: 'GET',
      encoding: 'u2',
      offset: '#',offset, 
    }]).then((value)=>{
      socket.broadcast.emit('redis-update', x,y,parseInt(value))
      console.log(value)
    });
    
   // socket.broadcast.emit('redis-update', x,y,getOffsetValue(offset))

  })
     
  

  // emit redis changes to all clients
 // socket.emit('canvas-sync', )
})
/*
function getOffsetValue(offset){

  var colorval;
  client.bitField('canvas', [{
    operation: 'GET',
    encoding: 'u2',
    offset: '#',offset, 
  }]).then((value)=>{
    colorval[0] = value
  });
 

  
   return colorval;
 
  
}*/
//  sudo systemctl restart redis-server

server.listen(3000)