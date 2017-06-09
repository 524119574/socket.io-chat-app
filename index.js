var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.use("/css", express.static(__dirname + '/css'));

io.on("connection", function(socket){
  console.log("a user connected!");
  socket.on("disconnect", function(){
    console.log("a user disconnect");
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
    console.log("gua!")
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});
