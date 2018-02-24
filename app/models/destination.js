var mongoose = require('mongoose')
var Schema = mongoose.Schema

var destinationSchema = new Schema({
  address: String
})

module.exports = mongoose.model('Destination', destinationSchema)
