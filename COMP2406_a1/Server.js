var http = require('http');
var fs = require('fs');
var url = require('url');

var ROOT_DIR = 'public';
var SONG_DIR = 'public/songs';

var MIME_TYPES = {
  'css': 'text/css',
  'gif': 'image/gif',
  'htm': 'text/html',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'text/javascript', //should really be application/javascript
  'json': 'application/json',
  'png': 'image/png',
  'txt': 'text/plain'
};

var get_mime = function(filename) {
    var ext, type;
    for (ext in MIME_TYPES) {
        type = MIME_TYPES[ext];
        if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
            return type;
        }
    }
    return MIME_TYPES['txt'];
};

http.createServer(function(request, response){
    var urlObj = url.parse(request.url, true, false);
    console.log("PATHNAME: " + urlObj.pathname);
    console.log("REQUEST: " + ROOT_DIR + urlObj.pathname);
    console.log("METHOD: " + request.method);

    var receivedData = "";
    request.on("data", function(chunk){receivedData += chunk;});
    request.on("end", function (){
    console.log("received data: ", receivedData);

    //GET
    if (request.method == "GET") {
      var filePath = ROOT_DIR + urlObj.pathname;
      if (urlObj.pathname === '/') filePath = ROOT_DIR + "/index.html";
      fs.readFile(filePath, function(err, data){
        if (err) {
          //report error to console
          console.log("ERROR: " + JSON.stringify(err));
          //respond with not found 404 to client
          response.writeHead(404);
          response.end(JSON.stringify(err));
          return;
        }
        response.writeHead(200, { "Content-Type": get_mime(filePath) });
        response.end(data);
      });
    }
    if (request.method == "POST"){
      let dataObj = JSON.parse(receivedData);
      console.log("received data object: ", dataObj);
      var returnObj = {};
      var songPath = SONG_DIR + '/' + dataObj.text + '.txt';
      if (fs.existsSync(songPath)){
        const lrc = fs.readFileSync(songPath).toString();
        returnObj.lyric = lrc;
      }
      response.writeHead(200, {"Content-Type" : MIME_TYPES["txt"]});
      response.end(JSON.stringify(returnObj));
    }
  });
}).listen(3000);
console.log("Server Running at http://127.0.0.1:3000  CNTL-C to quit");
console.log("to test: ");
console.log("localhost:3000");
console.log("localhost:3000/index.html");
