var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var imgData = ctx.createImageData(1000, 1000);
var i;

for (i = 0; i < imgData.data.length; i += 4) {


  imgData.data[i + 0] = 0;
  imgData.data[i + 1] = 0;
  imgData.data[i + 2] = 255;
  imgData.data[i + 3] = 255;
  
}

ctx.putImageData(imgData, 0, 20);

var pixelatedZoomCtx = document.getElementById('pixel').getContext('2d');
	pixelatedZoomCtx.imageSmoothingEnabled = false;
	pixelatedZoomCtx.mozImageSmoothingEnabled = false;
	pixelatedZoomCtx.webkitImageSmoothingEnabled = false;
	pixelatedZoomCtx.msImageSmoothingEnabled = false;


  var zoom = function(ctx, x, y) {
    ctx.drawImage(canvas,
									Math.min(Math.max(0, x - 5), img.width - 10),
									Math.min(Math.max(0, y - 5), img.height - 10),
									10, 10,
									0, 0,
									200, 200);
  };

  canvas.addEventListener('mousemove', function(event) {
		const x = event.layerX;
		const y = event.layerY;
   
    zoom(pixelatedZoomCtx, x, y);
	});
