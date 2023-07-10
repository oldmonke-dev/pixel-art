
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.height = 1000;
  canvas.width = 1000;
  ctx.imagesmoothingEnabled = false;
  var imgData = ctx.createImageData(1000, 1000);
  var i;
  // var canvas = io()
  
  for (i = 0; i < imgData.data.length ; i += 4) {
  
  
    imgData.data[i + 0] = Math.random() * 255;
    imgData.data[i + 1] = Math.random() * 255;
    imgData.data[i + 2] = Math.random() * 255;
    imgData.data[i + 3] = 255;
    
  }
  
  
  ctx.putImageData(imgData, 0, 0);
  
  

  var container = document.getElementById('div-container') 
  
  const panzoom = Panzoom(container, {
     
     maxScale: 40
  })
  //panzoom.pan(10, 10)
  //panzoom.zoom(2, { animate: true })
  
  // Panning and pinch zooming are bound automatically (unless disablePan is true).
  // There are several available methods for zooming
  // that can be bound on button clicks or mousewheel.
  
  canvas.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)




console.log(panzoom.getPan());
var my_canvas = document.getElementById('draw_canvas');
var ctx2 = canvas.getContext('2d');

canvas.addEventListener("mousemove", e => {
   var rect = canvas.getBoundingClientRect();
   var x = e.clientX - rect.left; 
   var y = e.clientY - rect.top; 
   console.log(x + "," + y)
   
   /*
   x = Math.floor(this.width x / canvas.clientWidth); 
   y = Math.floor(this.height  y / canvas.clientHeight); 
   if(tools[Tool.pen]) { this.draw(x, y) } else if(tools[Tool.eraser]) { this.erase(x, y); }  */
  
  });