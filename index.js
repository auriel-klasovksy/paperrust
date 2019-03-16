const express = require('express')
var http = require('http').Server(app);
var fs = require('fs');
const PORT = process.env.PORT || 5000

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(PORT, function(){
  console.log('listening on *:', PORT);
});