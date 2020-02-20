var http = require('http');
var Web3 = require('web3');
var Events = require('./Events');
var Items = require('./Items');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ws.nexty.io"))

MongoClient.connect(url, {
  useUnifiedTopology: true
}, function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  for (let i = 28588300; i <= 28588311; i++) {
    var query = {
      blockNumber: i
    };
    dbo.collection("events").find(query).toArray(function (err, results) {
      if (err) throw err;
      if (results != '') {
        console.log(results);
      } else {
        web3.eth.getBlock(i, true, function (error, result) {
          if (!error) {
            if (result != null && result.transactions != null) {
              Items.forEach((item) => {
                result.transactions.forEach(function (e) {
                  let id = e.input.slice(2, 10)
                  let para = '0x' + e.input.slice(11)
                  // if (accAddress === e.from || accAddress === e.to) {
                  if (id !== "0x" && id === item.id) {
                    web3.eth.getTransactionReceipt(e.hash, function (err, receipt) {
                      if (!err && receipt.logs !== undefined && receipt.logs !== null) {
                        Events.forEach((event) => {
                          for (let n = 0; n <= receipt.logs.length - 1; n++) {
                            if (event.code === receipt.logs[n].topics[0]) {
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
                                  };
                                  let query = {
                                    log_id: receipt.logs[n].id
                                  };
                                  dbo.collection("events").find(query).toArray(function (err, result) {
                                    if (err) throw err;
                                    if (result == '')
                                      dbo.collection("events").insertOne(myevent, function (err, res) {
                                        if (err) throw err;
                                        console.log("1 document inserted");
                                        dbo.collection("events").find(query).toArray(function (err, results) {
                                          if (err) throw err;
                                          if (results != '') {
                                            console.log(results);
                                          }
                                        });
                                      });
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
    });
    dbo.collection("funcs").find(query).toArray(function (err, results) {
      if (err) throw err;
      if (results != '') {
        console.log(results);
      } else {
        web3.eth.getBlock(i, true, function (error, result) {
          if (!error) {
            if (result != null && result.transactions != null) {
              Items.forEach((item) => {
                result.transactions.forEach(function (e) {
                  let id = e.input.slice(2, 10)
                  let para = '0x' + e.input.slice(11)
                  // if (accAddress === e.from || accAddress === e.to) {
                  if (id !== "0x" && id === item.id) {
                    web3.eth.getTransactionReceipt(e.hash, function (err, receipt) {
                      if (!err && receipt.logs !== undefined && receipt.logs !== null) {
                        Events.forEach((event) => {
                          for (let n = 0; n <= receipt.logs.length - 1; n++) {
                            if (event.code === receipt.logs[n].topics[0]) {
                              var strip_comments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
                              var argument_names = /([^\s,]+)/g
                              var fnStr = item.function.replace(strip_comments, '')
                              var parameters = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(argument_names)
                              if (parameters === null)
                                parameters = []
                              let fcut = item.function.indexOf('(')
                              let fname = item.function.slice(0, fcut + 1)
                              let decode = web3.eth.abi.decodeParameters(parameters, para)
                              let flog = 'Function ' + fname
                              for (let i = 0; i < parameters.length; i++) {
                                if (i > 0) {
                                  flog += parameters[i] + ': ' + decode[i] + ", ";
                                }
                                if (i === parameters.length - 1) {
                                  flog = flog + ')'
                                  flog = flog.replace(', )', ')')
                                  let myfunc = {
                                    function: flog,
                                    blockNumber: receipt.blockNumber,
                                    log_id: receipt.logs[n].id,
                                  };
                                  let query = {
                                    log_id: receipt.logs[n].id
                                  };
                                  dbo.collection("funcs").find(query).toArray(function (err, result) {
                                    if (err) throw err;
                                    if (result == '')
                                      dbo.collection("funcs").insertOne(myfunc, function (err, res) {
                                        if (err) throw err;
                                        console.log("1 document inserted");
                                        dbo.collection("funcs").find(query).toArray(function (err, results) {
                                          if (err) throw err;
                                          if (results != '') {
                                            console.log(results);
                                          }
                                        });
                                      });
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
    });
  }
});
