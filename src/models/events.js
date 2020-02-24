var mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
  event: String,
  blockNumber: Number,
  log_id: String
})


module.exports = mongoose.model('events', eventSchema)