const express = require('express');
const app = express();
var http = require('http').Server(app);
var fs = require('fs');
const PORT = process.env.PORT || 5000

app.use(express.static('public'));

http.listen(PORT, function(){
  console.log('listening on *:', PORT);
});
