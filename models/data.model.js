var mongoose = require('mongoose');

let dataSchema = new mongoose.Schema({
    event: String,
    number: String,
});

var Block = mongoose.model('Block', dataSchema, 'block')

module.exports = Block;