var mongoose = require('mongoose')

const Schema = mongoose.Schema

const funcSchema = new Schema({
  function: String,
  blockNumber: Number,
  log_id: String
})


module.exports = mongoose.model('funcs', funcSchema)