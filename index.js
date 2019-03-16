const app = require('express')();
var http = require('http').Server(app);
var fs = require('fs');
const PORT = process.env.PORT || 5000

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
    res.sendFile(__dirname + '/rsv3.js');
  res.sendFile(__dirname + '/style.css');
  res.sendFile(__dirname + '/inputNumberStyle.js');
  res.sendFile(__dirname + '/inputNumber.js');
});

http.listen(PORT, function(){
  console.log('listening on *:', PORT);
});
