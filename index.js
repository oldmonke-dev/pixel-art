// start redis server
// sudo systemctl restart redis-server
// sudo systemctl restart mongod
// uncomment mongoDB insertCommands while running the first time
const redis = require('redis');


const express = require ('express');
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const  {MongoClient} = require("mongodb");
// const { table } = require('console');



const client = redis.createClient();
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

app.use(express.static("public"))

var uri ="mongodb://0.0.0.0:27017";
const mgclient = new MongoClient(uri);
const database = mgclient.db('board_canvas');
const canvas  = database.collection('canvas');


/*var count  = async ()=>{await database.collection('canvas').estimatedDocumentCount();}
console.log(count)
if(count==0){
*/ 
var table = []
for (i=0;i<1000;i++){
  for(j=0;j<1000;j++){
      var obj = {
      x_pos: i,
      y_pos: j,
      val: 0,
      }
     table.push(obj)
    }
    
}
console.log(table)
canvas.insertMany(table, function(err, res) {
  if (err) throw err;
  
  
});


 // }





app.get("/getboard", async (req, res) => {
   
   const result = await canvas.find({})
   const allValues = await result.toArray();

   res.send(allValues)
    // res.send(JSON.stringify(results)).status(200);
  });




io.on("connection", socket =>{
  console.log("Hello, connection made", socket.id);
  
  
 
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
          offset: offset,
          value: 0
        }])
        break;
        
      case 'blue':
        color = 2;
        for(let i=0;i<=color;i++) {
          client.bitField('canvas', [{
            operation: 'SET',
            encoding: 'u2',
            offset: offset,
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
              offset: offset,
              value: i
            }]) }
        
        break;
      case 'green':
        color = 1;
        for(let i=0;i<=color;i++) {
          client.bitField('canvas', [{
            operation: 'SET',
            encoding: 'u2',
            offset: offset,
            value: i
          }])}
        break;

      default:
       
       
    }
    

    client.bitField('canvas', [{
      operation: 'GET',
      encoding: 'u2',
      offset: offset, 
    }]).then(async(value)=>{
      socket.broadcast.emit('redis-update', x,y,parseInt(value))
      console.log(value)
      await  canvas.updateOne( { x_pos:x, y_pos:y }, {$set: {val: value},});
     

    });
    
  

  })
     
  


})


server.listen(3000)