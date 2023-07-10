
// this file is all client side. 
// add a function to get x,y, color values of the data
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.height = 1000;
canvas.width = 1000;
ctx.imagesmoothingEnabled = false;
var imgData = ctx.createImageData(1000, 1000);

var socket = io();


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
  transformOrigin: {x: 0.5, y: 0.5},
  maxScale: 20,
  startScale: 1
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

canvas.addEventListener("click", e => {
  var rect = canvas.getBoundingClientRect();
  var zoom = panzoom.getScale();
  var x = parseInt((e.clientX - rect.left) / (zoom));
  var y = parseInt((e.clientY - rect.top) / (zoom));
  console.log(x + "," + y)
 

  var newdata = new ImageData(1,1);
  newdata.data[0] = 0;
  newdata.data[1] = 0;
  newdata.data[2] =0;
  newdata.data[3] = 255;
  ctx.putImageData(newdata, x, y);
  /*
  x = Math.floor(this.width x / canvas.clientWidth); 
  y = Math.floor(this.height  y / canvas.clientHeight); 
  if(tools[Tool.pen]) { this.draw(x, y) } else if(tools[Tool.eraser]) { this.erase(x, y); }  */

});




// Tranform X,Y values and Color to ImageData