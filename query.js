var http = require('http');
var Web3 = require('web3');
var Events = require('./Events');
var Items = require('./Items');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


MongoClient.connect(url, {
  useUnifiedTopology: true
}, function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  for (var i = 28583000; i <= 28588311; i++) {
    var query = {
      blockNumber: i
    };
    dbo.collection("events").find(query).toArray(function (err, result) {
      if (err) throw err;
      if (result != '') {
        console.log(result);
      } else {
          const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ws.nexty.io"))
          let i = 0
          for (i = 28588311 - 5000; i <= 28588311; i++) {
            web3.eth.getBlock(i, true, function (error, result) {
              if (!error) {
                // console.log(result)
                if (result != null && result.transactions != null) {
                  Items.forEach((item) => {
                    result.transactions.forEach(function (e) {
                      let id = e.input.slice(2, 10)
                      let para = '0x' + e.input.slice(11)
                      // if (accAddress === e.from || accAddress === e.to) {
                      if (id !== "0x" && id === item.id) {
                        web3.eth.getTransactionReceipt(e.hash, function (err, receipt) {
                          if (!err && receipt.logs !== undefined && receipt.logs !== null) {
                            // console.log(receipt)
                            Events.forEach((event) => {
                              for (let n = 0; n <= receipt.logs.length - 1; n++) {
                                if (event.code === receipt.logs[n].topics[0]) {
                                  // console.log(event.event, receipt.blockNumber)
                                  let ecut = event.event.indexOf('(')
                                  let ename = event.event.slice(0, ecut + 1)
                                  let eventparam = web3.eth.abi.decodeLog(
                                    event.inputs,
                                    receipt.logs[n].data,
                                    receipt.logs[n].topics)
                                  let elog = ename
                                  for (let i = 0; i < event.inputs.length + 1; i++) {
                                    if (i > 0) {
                                      let temp = elog + event.inputs[i - 1].name + ": " + eventparam[i - 1] + ", ";
                                      elog = temp
                                    }
                                    if (i === event.inputs.length) {
                                      elog = elog + ')'
                                      elog = elog.replace(', )', ')')
                                      let myevent = {
                                        event: elog,
                                        blockNumber: receipt.blockNumber,
                                        log_id: receipt.logs[n].id,
                                        log_num: n
                                      };
                                      console.log(myevent)
                                      let query = {
                                        log_id: receipt.logs[n].id
                                      };

                                      dbo.collection("events").insertOne(myevent, function (err, res) {
                                        if (err) throw err;
                                        console.log("1 document inserted");
                                      });
                                    }
                                  }

                                }
                              }
                            })
                          }
                        })
                      }
                      // }
                    })
                  })
                }
              }
            })
          }

 
      }
    });

  }
});