var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

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

http.listen(3000, function(){
  console.log("Listening on port 3000");
});