var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var port = process.env.PORT || 1337;

var Destination = require('./app/models/destination')

var apiRouter = express.Router();
mongoose.connect('mongodb://localhost:27017/cel');

apiRouter.use(function(req, res, next) {
  console.log('Someone just connected');
  next()
})

apiRouter.get('/', function(req, res) {
  res.json({
    message: 'Welcome to my API !'
  })
})


apiRouter.route('/history')
.post(function(req, res) {
  var destination = new Destination()
  console.log(`req body : ${JSON.stringify(req.body)}`);
  destination.address = req.body.params.address
  destination.save(function(err) {
    if (err) {
      if (err.code == 11000) {
        return res.json({
          success: false,
          message: 'This destination already exists'
        })
      } else {
        return res.send(err)
      }
    }

    res.json({
      message: 'Destination saved'
    })
  })
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization')
  next();
});

app.use(morgan('dev'))


apiRouter.route('/history')
.get(function(req, res) {
  var destinations = Destination.find(function(error, dest) {
    console.log(`destinations fetched : ${dest}`);
    var toReturn = dest.filter((d, index) => {
      return typeof d.address !== 'undefined'
    })
    res.json({
      history:toReturn
    })
  })

})

app.use('/api', apiRouter)
app.listen(port);
console.log(`${port} is the magic port!`);
