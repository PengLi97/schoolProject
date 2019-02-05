const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
var stones = [];
var socket = io('http://' + window.document.location.host);
var stoneBeingMoved;
var indexBeingMoved;
var timerStart;
var xStart, yStart; //locations where stones before dragged
var deltaX, deltaY //location where mouse is pressed
var deltaTime;

function drawCanvas(){

  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.moveTo(500, 0);
  context.lineTo(500, 500);
  context.stroke();

  context.beginPath();
  context.fillStyle = "blue"
  context.arc(600,100,90 ,0,2*Math.PI);
  context.fill();
  context.closePath();

  context.beginPath();
  context.fillStyle = "blue"
  context.arc(250,250,225 ,0,2*Math.PI);
  context.fill();
  context.closePath();

  context.beginPath();
  context.fillStyle = "white"
  context.arc(600,100,65,0,7);
  context.fill();
  context.closePath();

  context.beginPath();
  context.fillStyle = "white"
  context.arc(250,250,162.5,0,7);
  context.fill();
  context.closePath();

  context.beginPath();
  context.fillStyle = "red"
  context.arc(600,100,45,0,7);
  context.fill();
  context.closePath();

  context.beginPath();
  context.fillStyle = "red"
  context.arc(250,250,112.5,0,7);
  context.fill();
  context.closePath();

  context.beginPath();
  context.fillStyle = "white"
  context.arc(600,100,20,0,7);
  context.fill();
  context.closePath();

  context.beginPath();
  context.fillStyle = "white"
  context.arc(250,250,50,0,7);
  context.fill();
  context.closePath();

  for (var s of stones){
    //right half
    context.beginPath();
    context.fillStyle = s.c;
    context.arc(s.x,s.y,s.r,0,7);
    context.fill();
    context.closePath();
    context.beginPath();
    context.fillStyle = s.cc;
    context.arc(s.x,s.y,s.rr,0,7);
    context.fill();
    context.closePath();
    //left half
    context.beginPath();
    context.fillStyle = s.c;
    context.arc((s.x-500)*2.5,s.y*2.5,s.r*2.5,0,7);
    context.fill();
    context.closePath();
    context.beginPath();
    context.fillStyle = s.cc;
    context.arc((s.x-500)*2.5,s.y*2.5,s.rr*2.5,0,7);
    context.fill();
    context.closePath();
  }
}

function getStoneAtLocation(aCanvasX, aCanvasY){
  for (let i = 0; i < stones.length; i++) {
    let s = stones[i];
    if (s.x+s.r >= aCanvasX && s.x-s.r <= aCanvasX && s.y+s.r >= aCanvasY && s.y-s.r <= aCanvasY) {
      xStart = s.x;
      yStart = s.y;
      indexBeingMoved = i;
      return stones[i];
    }
  }
  return null;
}

function handleMouseDown(e) {
  let rect = canvas.getBoundingClientRect();
  let canvasX = e.pageX - rect.left //use  event object pageX and pageY
  let canvasY = e.pageY - rect.top
  console.log("mouse down:" + canvasX + ", " + canvasY)
  stoneBeingMoved = getStoneAtLocation(canvasX,canvasY);
  if(stoneBeingMoved) {
    timerStart = Date.now();
    deltaX = stoneBeingMoved.x - canvasX
    deltaY = stoneBeingMoved.y - canvasY
    $("#canvas1").mousemove(handleMouseMove)
    $("#canvas1").mouseup(handleMouseUp)
  }
  e.stopPropagation();
  e.preventDefault();
  drawCanvas();
}

function handleMouseMove(e) {
  console.log("mouse move");
  let rect = canvas.getBoundingClientRect()
  let canvasX = e.pageX - rect.left
  let canvasY = e.pageY - rect.top
  stoneBeingMoved.x = canvasX + deltaX
  stoneBeingMoved.y = canvasY + deltaY
  if (stoneBeingMoved.x > 690) stoneBeingMoved.x = 690;
  if (stoneBeingMoved.x < 510) stoneBeingMoved.x = 510;
  if (stoneBeingMoved.y < 10) stoneBeingMoved.y = 10;
  if (stoneBeingMoved.y > 490) stoneBeingMoved.y = 490;
  e.stopPropagation();
  drawCanvas();
  deltaTime = Date.now() - timerStart;
}

function handleMouseUp(e) {
  console.log("mouse up");
  e.stopPropagation();
  var requsetObj = {};
  requsetObj.index = indexBeingMoved;
  requsetObj.x = stoneBeingMoved.x;
  requsetObj.y = stoneBeingMoved.y;
  requsetObj.vx = (stoneBeingMoved.x - xStart) / deltaTime * 100;
  requsetObj.vy = (stoneBeingMoved.y - yStart) / deltaTime * 100;
  //remove mouse move and mouse up handlers but leave mouse down handler
  $("#canvas1").off("mousemove", handleMouseMove); //remove mouse move handler
  $("#canvas1").off("mouseup", handleMouseUp); //remove mouse up handler

  drawCanvas();
  socket.emit('stoneData',requsetObj);
}

socket.on('allStonesData', function(data){
  stones = data;
  drawCanvas();
})

$(document).ready(function() {
  console.log("ready")
  socket.emit('initLocation',null);
  //add mouse down listener to our canvas object
  $("#canvas1").mousedown(handleMouseDown)
  //add keyboard handler to document
  //$(document).keydown(handleKeyDown)
  //$(document).keyup(handleKeyUp)

  //timer = setInterval(handleTimer, 100) //tenth of second
  //pollingTimer = setInterval(pollingTimerHandler, 100) //quarter of a second
  //clearTimeout(timer) //to stop

  //drawCanvas()
})




//drawCanvas();
