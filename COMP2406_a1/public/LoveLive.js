var words = [];
var chord = [];
var FONT = '20pt Arial';
const SPACEPX = 10;
const ENTER = 13;
const trchar1 = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
const trchar2 = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"]


var wordBeingMoved;
var deltaX, deltaY; //location where mouse is pressed
var canvas = document.getElementById('canvas1'); //our drawing canvas
function getWordAtLocation(aCanvasX, aCanvasY) {

  //locate the word near aCanvasX,aCanvasY
  //Just use crude region for now.
  //should be improved to using lenght of word etc.

  //note you will have to click near the start of the word
  //as it is implemented now
  let context = canvas.getContext('2d');
  context.font = FONT;
  let width = 0;
  for (let i = 0; i < words.length; i++) {
    let width = context.measureText(words[i].word).width;
    if (Math.abs(words[i].x+width/2 - aCanvasX) < width/2 &&
      Math.abs(words[i].y - aCanvasY) < 20) {
        return words[i]
    }
  }
  for (let i = 0; i < chord.length; i++) {
    let width = context.measureText(chord[i].word).width;
    if (Math.abs(chord[i].x+width/2 - aCanvasX) < width/2 &&
      Math.abs(chord[i].y - aCanvasY) < 20) {
        return chord[i]
    }
  }
  return null
}

function drawCanvas(){
  let context = canvas.getContext('2d');
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height); //erase canvas

  context.font = FONT;
  context.fillStyle = 'HotPink';
  context.strokeStyle = 'HotPink';
  for (let i = 0; i < words.length; i++) {
    let data = words[i]
    context.fillText(data.word, data.x, data.y);
    context.strokeText(data.word, data.x, data.y);

  }
  context.fillStyle = 'Green';
  context.strokeStyle = 'Green';
  for (let i = 0; i < chord.length; i++) {
    let data = chord[i]
    context.fillText(data.word, data.x, data.y);
    context.strokeText(data.word, data.x, data.y)

  }
}

function handleSubmitButton() {
  let userText = $('#userTextField').val();
  if (userText && userText != '') {
    let userRequestObj = {
      text: userText
    }
    let userRequestJSON = JSON.stringify(userRequestObj);
    $('#userTextField').val('');
    $.post("userText", userRequestJSON, function(data, status){
      let responseObj = JSON.parse(data);
      if(responseObj.lyric){
        locateWords(responseObj.lyric);
      }else{
        words = [];
        words.push({word: "NOT FOUND", x:400, y:100});
      }
      drawCanvas();
    });
  }
}

function locateWords(text){
  let textDiv = document.getElementById("text-area");
  textDiv.innerHTML = `<p>${""}</p>`;
  textDiv.innerHTML += `<p>`;
  const lrc = text.toString().split("\n");
  let wordList = [];
  let chordList = [];
  let xx = 50;
  let yy = 50;
  for (let i = 0; i < lrc.length; i++){
    let text = "";
    textDiv.innerHTML += `<br>`;
    for (let c of lrc[i]){
      if (c == '['){
        if(text.length != 0){
          let w = {word: text, x: xx, y: yy};
          xx += calcWordWidth(text);
          xx += SPACEPX;
          wordList.push(w);
          textDiv.innerHTML += `${text}`;
          textDiv.innerHTML += `${" "}`;
        }
        text = "[";
      }else if (c == ']') {
        text += c;
        w = {word: text, x: xx, y: yy};
        xx += calcWordWidth(text);
        xx += SPACEPX;
        chordList.push(w);
        textDiv.innerHTML += `${text}`;
        textDiv.innerHTML += `${" "}`;
        text = "";
      }
      else if (c == ' ') {
        if (text.length != 0){
          let w = {word: text, x: xx, y: yy};
          xx += calcWordWidth(text);
          xx += SPACEPX;
          wordList.push(w);
          textDiv.innerHTML += `${text}`;
          textDiv.innerHTML += `${" "}`;
          text = "";
        }
      }else text += c;
    }
    yy += 40;
    xx = 50;
    textDiv.innerHTML += `</br>`;
  }
  words = wordList;
  chord = chordList;
  textDiv.innerHTML += `</p>`;
}

function calcWordWidth(word){
  let context = canvas.getContext('2d');
  context.font = FONT;
  let width = context.measureText(word).width;
  return width;
}

function handleKeyUp(e) {
  if (e.which == ENTER) {
    handleSubmitButton() //treat ENTER key like you would a submit
    $('#userTextField').val('') //clear the user text field
  }
  e.stopPropagation()
  e.preventDefault()
}


function getChartIndex(w){
  for (let i = 0; i < trchar1.length; i++){
    if (trchar1[i] == w) return i;
  }
  for (let i = 0; i < trchar2.length; i++){
    if (trchar1[i] == w) return i;
  }
  return -1;
}

function transposeUp(){
  for (let i = 0; i < chord.length; i++){
    let m = "";
    let c = "";
    for (let a of chord[i].word){
      if (a == "[" || a == "]") continue;
      if (a == "C" || a == "D" || a == "E" || a == "F" || a == "G" || a == "A" || a == "B" || a == "b" || a == "#") c += a;
      else m += a;
    }
    let a = getChartIndex(c);
    if (a != -1){
      if(a == 11) c = trchar1[0];
      else c = trchar1[a+1];
    }
    let cho = "[" + c+m+"]";
    chord[i].word = cho;
  }
  drawCanvas();
}
function transposeDown(){
  for (let i = 0; i < chord.length; i++){
    let m = "";
    let c = "";
    for (let a of chord[i].word){
      if (a == "[" || a == "]") continue;
      if (a == "C" || a == "D" || a == "E" || a == "F" || a == "G" || a == "A" || a == "B" || a == "b" || a == "#") c += a;
      else m += a;
    }
    let a = getChartIndex(c);
    if (a != -1){
      if(a == 0) c = trchar1[11];
      else c = trchar1[a-1];
    }
    let cho = "[" + c+m+"]";
    chord[i].word = cho;
  }
  drawCanvas();
}

function handleMouseDown(e) {

  //get mouse location relative to canvas top left
  let rect = canvas.getBoundingClientRect()
  //var canvasX = e.clientX - rect.left
  //var canvasY = e.clientY - rect.top
  let canvasX = e.pageX - rect.left //use jQuery event object pageX and pageY
  let canvasY = e.pageY - rect.top
  console.log("mouse down:" + canvasX + ", " + canvasY)

  wordBeingMoved = getWordAtLocation(canvasX, canvasY)
  //console.log(wordBeingMoved.word)
  if (wordBeingMoved != null) {
    deltaX = wordBeingMoved.x - canvasX
    deltaY = wordBeingMoved.y - canvasY
    //document.addEventListener("mousemove", handleMouseMove, true)
    //document.addEventListener("mouseup", handleMouseUp, true)
    $("#canvas1").mousemove(handleMouseMove)
    $("#canvas1").mouseup(handleMouseUp)

  }

  // Stop propagation of the event // TODO:  stop any default
  // browser behaviour

  e.stopPropagation()
  e.preventDefault()

  drawCanvas()
}

function handleMouseUp(e) {
  console.log("mouse up")

  e.stopPropagation()

  //$("#canvas1").off(); //remove all event handlers from canvas
  //$("#canvas1").mousedown(handleMouseDown); //add mouse down handler

  //remove mouse move and mouse up handlers but leave mouse down handler
  $("#canvas1").off("mousemove", handleMouseMove) //remove mouse move handler
  $("#canvas1").off("mouseup", handleMouseUp) //remove mouse up handler

  drawCanvas() //redraw the canvas
}

function handleMouseMove(e) {

  console.log("mouse move")

  //get mouse location relative to canvas top left
  let rect = canvas.getBoundingClientRect()
  let canvasX = e.pageX - rect.left
  let canvasY = e.pageY - rect.top

  wordBeingMoved.x = canvasX + deltaX
  wordBeingMoved.y = canvasY + deltaY

  e.stopPropagation()

  drawCanvas()
}

$(document).ready(function() {
  //This is called after the broswer has loaded the web page

  //add mouse down listener to our canvas object
  $("#canvas1").mousedown(handleMouseDown)

  //add key handler for the document as a whole, not separate elements.
  //$(document).keydown(handleKeyDown)
  $(document).keyup(handleKeyUp)

  //timer = setInterval(handleTimer, 100)
  //clearTimeout(timer) //to stop

  drawCanvas()
})
