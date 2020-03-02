var Web3 = require('web3');
var Data = require('../models/Block.model')
var Events = require('./Mockup/Events');
var Items = require('./Mockup/Items');
var Accs = require('./Mockup/Accs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

var cursor = 1000000;

const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ws.nexty.io"))

web3.eth.subscribe('newBlockHeaders', async function (err, new_block) {
  if (!err) {
    console.log(new_block.number);
    Block.findOne().sort({number: -1}).exec(async function (err, db_block) {
      if (db_block == null) {db_block = {number: cursor}} 
        Block.deleteMany({number: {$lte: db_block.number - 1000}}, function (err, res) {
          if (err) console.log(err)
        })
      if(db_block.number < new_block.number) {
      let _from_block = Math.max(db_block.number, cursor)
      let _to_block = Math.min(new_block.number - 6, db_block.number + 100000)
        await scanBlock(_from_block, _to_block)
      }else {
        await scanBlock(new_block.number - 6, new_block.number - 6)
      }
    })
  }

  console.error(error);
})



scanBlock = async (_from_block, _to_block) => {
  const myContract1 = new web3.eth.Contract([], '0x0000000000000000000000000000000000045678');

}

await Block.findOne().sort({number: -1}).exec(async function (err, block_number) {
  if (block_number == null) block_number = {number: cursor}
  // Remove all records which < block_number - 10000
  Block.deleteMany({number: {$lte: block_number.number - 1000}}, function (err, res) {
    if (err) console.log(err)
  })

  if (block_number.number < new_block.number - 6) {
    let from_block = Math.max(block_number.number, cursor)
    let to_block = Math.min(new_block.number - 6, block_number.number + 100000)
    await scanBlock(from_block + 1, to_block)
  } else {
    await scanBlock(new_block.number - 6, new_block.number - 6)
  }
})