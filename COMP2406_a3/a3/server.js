const app = require('http').createServer(handler)
const io = require('socket.io')(app) //wrap server app in socket io capability
const fs = require("fs") //need to read static files
const url = require("url") //to parse url strings
const PORT = process.env.PORT || 3000
const DECELERATING = 5;

 //will be over-written by clients

const ROOT_DIR = "public" //dir to serve static files from

const MIME_TYPES = {
  css: "text/css",
  gif: "image/gif",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "application/javascript",
  json: "application/json",
  png: "image/png",
  svg: "image/svg+xml",
  txt: "text/plain"
}

function get_mime(filename) {
  for (let ext in MIME_TYPES) {
    if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
      return MIME_TYPES[ext]
    }
  }
  return MIME_TYPES["txt"]
}

app.listen(PORT)

const Stone = require('./Stone');
var stones = [];
stones.push(new Stone(520, 480, "grey", "yellow"));
stones.push(new Stone(545, 480, "grey", "yellow"));
stones.push(new Stone(570, 480, "grey", "yellow"));
stones.push(new Stone(620, 480, "grey", "red"));
stones.push(new Stone(645, 480, "grey", "red"));
stones.push(new Stone(670, 480, "grey", "red"));

function handler (request, response) {
    let urlObj = url.parse(request.url, true, false)
    console.log("\n============================")
    console.log("PATHNAME: " + urlObj.pathname)
    console.log("REQUEST: " + ROOT_DIR + urlObj.pathname)
    console.log("METHOD: " + request.method)

    let receivedData = ""

    //attached event handlers to collect the message data
    request.on("data", function(chunk) {
      receivedData += chunk
    })

    //event handler for the end of the message
    request.on("end", function() {
      console.log("REQUEST END: ")
      console.log("received data: ", receivedData)
      console.log("type: ", typeof receivedData)

      //if it is a POST request then echo back the data.
      /*
		A post message will be interpreted as either a request for
		the location of the moving box, or the location of the moving box
		being set by a client.
		If the .x and .y attributes are >= 0
		treat it as setting the location of the moving box.
		If the .x and .y attributes are < 0 treat it as a request (poll)
		for the location of the moving box.
		In either case echo back the location of the moving box to whatever client
		sent the post request.

		Can you think of a nicer API than using the numeric value of .x and .y
		to indicate a set vs. get of the moving box location.
		*/
      if (request.method == "POST") {
        let dataObj = JSON.parse(receivedData)
        //echo back the location of the moving box to who ever
        //sent the POST message
        response.writeHead(200, {
          "Content-Type": MIME_TYPES["json"]
        })
        response.end() //send just the JSON object
      }

      if (request.method == "GET") {
        //handle GET requests as static file requests
        fs.readFile(ROOT_DIR + urlObj.pathname, function(err, data) {
          if (err) {
            //report error to console
            console.log("ERROR: " + JSON.stringify(err))
            //respond with not found 404 to client
            response.writeHead(404)
            response.end(JSON.stringify(err))
            return
          }
          response.writeHead(200, {
            "Content-Type": get_mime(urlObj.pathname)
          })
          response.end(data)
        })
      }
    })
  }

  function isAllStop(){
    for (var a of stones){
      if (a.vx != 0) return false;
      if (a.vy != 0) return false;
    }
    return true;
  }

  function decelerate(){
    for (var a of stones){
      if (a.vx > 0) {
        a.vx -= DECELERATING;
        if (a.vx < 0) a.vx = 0;
      }else if (a.vx < 0){
        a.vx += DECELERATING;
        if (a.vx > 0) a.vx = 0;
      }
      if (a.vy > 0) {
        a.vy -= DECELERATING;
        if (a.vy < 0) a.vy = 0;
      }else if (a.vy < 0){
        a.vy += DECELERATING;
        if (a.vy > 0) a.vy = 0;
      }
    }
  }

  function move(){
    for (var i = 0; i < stones.length; i++){
      var s = stones[i];
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 510 || s.x > 690) {
        if (s.x < 510) s.x = 510;
        if (s.x > 690) s.x = 690;
        s.vx *= -1;
      }
      if (s.y < 10 || s.y > 490) {
        if (s.y < 10 ) y = 11;
        if (s.y > 490) y = 489;
        s.vy *= -1;
      }
    }
  }

  function stoneMove(data){

    if (data){
      stones[data.index].x = data.x;
      stones[data.index].y = data.y;
      stones[data.index].vx = data.vx;
      stones[data.index].vy = data.vy;
    }else io.emit('allStonesData', stones);
    var myVar;
    myVar = setInterval(function(){
      if (!isAllStop()){
        decelerate();
        move();
        io.emit('allStonesData', stones);
      }else clearInterval(myVar);
    }, 50);
  }

  io.on('connection', function(socket){
    socket.on('initLocation', function(data){stoneMove(null);});
    socket.on('stoneData', function(data){stoneMove(data);});

    //socket.on('blueBoxData', function(data){
      //console.log('RECEIVED BOX DATA: ' + data)
      //to broadcast message to everyone including sender:
      //io.emit('blueBoxData', data) //broadcast to everyone including sender
    //})
  });
console.log("Server Running at PORT: 3000  CNTL-C to quit")
console.log("To Test:")
console.log("Open several browsers at: http://localhost:3000/Assignment3.html")
