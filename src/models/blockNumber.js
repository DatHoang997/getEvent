var mongoose = require('mongoose')

const Schema = mongoose.Schema

const blnSchema = new Schema({
  blockNumber: Number,
})


module.exports = mongoose.model('blockNumber', blnSchema)