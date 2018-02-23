var express = require('express');
var app = express();
var path = require('path');

var mainRouter = express.Router();

mainRouter.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/history.json'))
})

app.use('/history', mainRouter)
app.listen(1337);
console.log('1337 is the magic port!');
