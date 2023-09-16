
// client file 


// add a function to get x,y, color values of the data
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.height = 1000;
canvas.width = 1000;
ctx.imagesmoothingEnabled = false;
var imgData = ctx.createImageData(1000, 1000);

var buttonblue = document.getElementById('button-blue');
var buttonred = document.getElementById('button-red');
var buttonyellow = document.getElementById('button-yellow');
var buttongreen = document.getElementById('button-green');




let fetchRes = fetch(
  "http://localhost:3000/getboard");
  // fetchRes is the promise to resolve
  // it by using.then() method
  fetchRes.then(res =>
      res.json()).then(d => {
          console.log(d)
      })

const socket = io();
socket.on("connection", () =>{
  alert("You have connected with id: ", socket.id);
  // socket.on('init-redis', (bitfield)=>{  convert image data and put in canvas}  )
  // reading initial canvas state



})

/* generating random noise 
for (var i = 0; i < imgData.data.length; i += 4) {


  imgData.data[i + 0] = Math.random() * 255;
  imgData.data[i + 1] = Math.random() * 255;
  imgData.data[i + 2] = Math.random() * 255;
  imgData.data[i + 3] = 255;

}*/



// function call for putting imagedata
ctx.putImageData(imgData, 0, 0);



var container = document.getElementById('div-container')

const panzoom = Panzoom(container, {
  
  beforeMouseDown: function(event) {
   
    // allow mouse-down panning only if altKey is down. Otherwise - ignore
    var shouldIgnore = !event.altKey;
    return shouldIgnore;
  }, 
  transformOrigin: {x: 0.5, y: 0.5},
  maxScale: 20,
  startScale: 1, 
  
})
//panzoom.pan(10, 10)
//panzoom.zoom(2, { animate: true })

// Panning and pinch zooming are bound automatically (unless disablePan is true).
// There are several available methods for zooming
// that can be bound on button clicks or mousewheel.

canvas.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)

console.log(panzoom.getScale());
console.log(panzoom.getPan());

var my_canvas = document.getElementById('draw_canvas');
var ctx2 = canvas.getContext('2d');





var colorinfo;
var newdata = new ImageData(1,1);


buttonblue.addEventListener('click', () => {
  
  newdata.data[0] = 0;
  newdata.data[1] = 0;
  newdata.data[2] =255;
  newdata.data[3] = 255;
  colorinfo = "blue"
})
buttonred.addEventListener('click', () => {
  
  newdata.data[0] = 255;
  newdata.data[1] = 0;
  newdata.data[2] =0;
  newdata.data[3] = 255;
  colorinfo = "red"
})
buttongreen.addEventListener('click', () => {
  
  newdata.data[0] = 0;
  newdata.data[1] = 255;
  newdata.data[2] =0;
  newdata.data[3] = 255;
  colorinfo = "green"
})
buttonyellow.addEventListener('click', () => {
  
  newdata.data[0] = 255;
  newdata.data[1] = 255;
  newdata.data[2] =0;
  newdata.data[3] = 255;
  colorinfo = 'yellow'
})



canvas.addEventListener("contextmenu", e => {
  e.preventDefault()
  var rect = canvas.getBoundingClientRect();
  var zoom = panzoom.getScale();
  var x = parseInt((e.clientX - rect.left) / (zoom));
  var y = parseInt((e.clientY - rect.top) / (zoom));
  console.log(x + "," + y)
 
 // rgb
 
  socket.emit("color-update", x,y, colorinfo)
  
  
 
  ctx.putImageData(newdata, x, y);


  // we can send data to server itself here 


  /*
  x = Math.floor(this.width x / canvas.clientWidth); 
  y = Math.floor(this.height  y / canvas.clientHeight); 
  if(tools[Tool.pen]) { this.draw(x, y) } else if(tools[Tool.eraser]) { this.erase(x, y); }  */

});


 
 // this how you send events to the server
 /*
  canvas.addEventListener("click", e => {
    e.preventDefault();
    var x =0;
    if(x){
      // is the input value
      // here we are going to send changes to the canvas redis database.
      socket.emit("color-update", x);
    }

  })

  // listen to the server emit
  socket.on("color-update", function(msg) {
    console.log(msg);
    // here we are going the update canvas image data 
  })
// Tranform X,Y values and Color to ImageData

*/

socket.on('redis-update', (x,y,value)=>{
  var data = new ImageData(1,1);
  switch (value){
    case 0:
      data.data[0] = 255;
      data.data[1] = 0;
      data.data[2] =0;
      data.data[3] = 255;
      ctx.putImageData(data, x, y);
      break;
    case 1:
      data.data[0] = 0;
      data.data[1] = 255;
      data.data[2] =0;
      data.data[3] = 255;
      ctx.putImageData(data, x, y);
      break;
    case 2:
      data.data[0] = 0;
      data.data[1] = 0;
      data.data[2] =255;
      data.data[3] = 255;
      ctx.putImageData(data, x, y);
      break;
    case 3:
      data.data[0] = 255;
      data.data[1] = 255;
      data.data[2] =0;
      data.data[3] = 252;
      ctx.putImageData(data, x, y);
      break;
    default: 
     console.log('no response')
  }
})