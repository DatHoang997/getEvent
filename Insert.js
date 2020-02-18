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

  const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ws.nexty.io"))

  for (var i = 28588311 - 500; i <= 28588311; i++) {
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
                          let q = event.event.indexOf('(')
                          let w = event.event.slice(0, q + 1)
                          let eventparam = web3.eth.abi.decodeLog(
                            event.inputs,
                            receipt.logs[n].data,
                            receipt.logs[n].topics)
                          if (event.inputs.length === 0) {
                            let myevents = 'event ' + event.event
                            let myevent = {
                              event: myevents,
                              blockNumber: receipt.blockNumber,
                              log_id: receipt.logs[n].id
                            };
                            console.log(myevent)
                            var query = {
                              log_id: receipt.logs[n].id
                            };
                            dbo.collection("events").find(query).toArray(function (err, result) {
                              if (result == "") {
                                dbo.collection("events").insertOne(myevent, function (err, res) {
                                  if (err) throw err;
                                  console.log("1 document inserted");
                                });
                              }
                            });
                          }
                          if (event.inputs.length === 1) {
                            let myevents = 'event ' + w + event.inputs['0'].name + ': ' + eventparam['0'] + ')'
                            let myevent = {
                              event: myevents,
                              blockNumber: receipt.blockNumber,
                              log_id: receipt.logs[n].id
                            };
                            console.log(myevent)
                            var query = {
                              log_id: receipt.logs[n].id
                            };
                            dbo.collection("events").find(query).toArray(function (err, result) {
                              if (result == "") {
                                dbo.collection("events").insertOne(myevent, function (err, res) {
                                  if (err) throw err;
                                  console.log("1 document inserted");
                                });
                              }
                            });
                          }
                          if (event.inputs.length === 2) {
                            let myevents = 'event ' + w + event.inputs['0'].name + ': ' + eventparam['0'] + ', ' + event.inputs['1'].name + ': ' + eventparam['1'] + ')'
                            let myevent = {
                              event: myevents,
                              blockNumber: receipt.blockNumber,
                              log_id: receipt.logs[n].id
                            };
                            console.log(myevent, receipt.logs[n].id)
                            var query = {
                              log_id: receipt.logs[n].id
                            };
                            dbo.collection("events").find(query).toArray(function (err, result) {
                              if (result == "") {
                                dbo.collection("events").insertOne(myevent, function (err, res) {
                                  if (err) throw err;
                                  console.log("1 document inserted");
                                });
                              }
                            });
                          }
                          if (event.inputs.length === 3) {
                            let myevents = 'event ' + w + event.inputs['0'].name + ': ' + eventparam['0'] + ', ' + event.inputs['1'].name + ': ' + eventparam['1'] + ', ' + event.inputs['2'].name + ': ' + eventparam['2'] + ')'
                            let myevent = {
                              event: myevents,
                              blockNumber: receipt.blockNumber,
                              log_id: receipt.logs[n].id
                            };
                            console.log(myevent, receipt.logs[n].id)
                            var query = {
                              log_id: receipt.logs[n].id
                            };
                            dbo.collection("events").find(query).toArray(function (err, result) {
                              if (result == "") {
                                dbo.collection("events").insertOne(myevent, function (err, res) {
                                  if (err) throw err;
                                  console.log("1 document inserted");
                                });
                              }
                            });
                          }
                          if (event.inputs.length === 4) {
                            let myevents = 'event ' + w + event.inputs['0'].name + ': ' + eventparam['0'] + ', ' + event.inputs['1'].name + ': ' + eventparam['1'] + ', ' + event.inputs['2'].name + ': ' + eventparam['2'] + ', ' + event.inputs['3'].name + ': ' + eventparam['3'] + ')'
                            let myevent = {
                              event: myevents,
                              blockNumber: receipt.blockNumber,
                              log_id: receipt.logs[n].id
                            };
                            console.log(myevent)
                            var query = {
                              log_id: receipt.logs[n].id
                            };
                            dbo.collection("events").find(query).toArray(function (err, result) {
                              if (result == "") {
                                dbo.collection("events").insertOne(myevent, function (err, res) {
                                  if (err) throw err;
                                  console.log("1 document inserted");
                                });
                              }
                            });
                          }
                          if (event.inputs.length === 5) {
                            let myevents = 'event ' + w + event.inputs['0'].name + ': ' + eventparam['0'] + ', ' + event.inputs['1'].name + ': ' + eventparam['1'] + ', ' + event.inputs['2'].name + ': ' + eventparam['2'] + ', ' + event.inputs['3'].name + ': ' + eventparam['3'] + ', ' + event.inputs['4'].name + ': ' + eventparam['4'] + ')'
                            let myevent = {
                              event: myevents,
                              blockNumber: receipt.blockNumber,
                              log_id: receipt.logs[n].id
                            };
                            console.log(myevent)
                            var query = {
                              log_id: receipt.logs[n].id
                            };
                            dbo.collection("events").find(query).toArray(function (err, result) {
                              if (result == "") {
                                dbo.collection("events").insertOne(myevent, function (err, res) {
                                  if (err) throw err;
                                  console.log("1 document inserted");
                                });
                              }
                            });
                          }


                          var strip_comments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
                          var argument_names = /([^\s,]+)/g
                          var fnStr = item.function.replace(strip_comments, '')
                          var parameters = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(argument_names)
                          if (parameters === null)
                            parameters = []
                          let para1 = parameters[0]
                          let para2 = parameters[1]
                          let para3 = parameters[2]
                          let para4 = parameters[3]
                          let para5 = parameters[4]
                          let count = parameters.length
                          let a = item.function.indexOf('(')
                          let b = item.function.slice(0, a + 1)
                          // console.log(e)
                          if (count === 0) {
                            let myfuncs = e.from + ',' + item.function+',' + e.blockNumber
                            let myfunc = {
                              function: myfuncs,
                              blockNumber: receipt.blockNumber,
                              log_id: receipt.logs[n].id
                            };
                            console.log(myfunc)
                            var query = {
                              log_id: receipt.logs[n].id
                            };
                            dbo.collection("funcs").find(query).toArray(function (err, result) {
                              if (result == "") {
                                dbo.collection("funcs").insertOne(myfunc, function (err, res) {
                                  if (err) throw err;
                                  console.log("1 document inserted");
                                });
                              }
                            });
                          }
                          if (count === 1) {
                            var decode = web3.eth.abi.decodeParameters([para1], para)
                            // if(e.to === "0x0000000000000000000000000000000000023456") {
                            let myfuncs = 'dex ' + b + para1 + ': ' + decode["0"] + ')'
                            let myfunc = {
                              function: myfuncs,
                              blockNumber: receipt.blockNumber,
                              log_id: receipt.logs[n].id
                            };
                            console.log(myfunc)
                            var query = {
                              log_id: receipt.logs[n].id
                            };
                            dbo.collection("funcs").find(query).toArray(function (err, result) {
                              if (result == "") {
                                dbo.collection("funcs").insertOne(myfunc, function (err, res) {
                                  if (err) throw err;
                                  console.log("1 document inserted");
                                });
                              }
                            });
                            // } 
                          }
                          if (count === 2) {
                            var decode1 = web3.eth.abi.decodeParameters([para1, para2], para)
                            // if(e.to === "0x0000000000000000000000000000000000023456") {
                            let myfuncs = 'dex ' + b + para1 + ': ' + decode1["0"] + ', ' + para2 + ': ' + decode1["1"] + ')'
                            let myfunc = {
                              function: myfuncs,
                              blockNumber: receipt.blockNumber,
                              log_id: receipt.logs[n].id
                            };
                            console.log(myfunc)
                            var query = {
                              log_id: receipt.logs[n].id
                            };
                            dbo.collection("funcs").find(query).toArray(function (err, result) {
                              if (result == "") {
                                dbo.collection("funcs").insertOne(myfunc, function (err, res) {
                                  if (err) throw err;
                                  console.log("1 document inserted");
                                });
                              }
                            });
                            // } 
                          }
                          if (count === 3) {
                            var decode2 = web3.eth.abi.decodeParameters([para1, para2, para3], para)
                            // if(e.to === "0x0000000000000000000000000000000000023456") {
                            let myfuncs = 'dex ' + b + para1 + ': ' + decode2["0"] + ', ' + para2 + ': ' + decode2["1"] + ', ' + para3 + ': ' + decode2["2"] + ')'
                            let myfunc = {
                              function: myfuncs,
                              blockNumber: receipt.blockNumber,
                              log_id: receipt.logs[n].id
                            };
                            console.log(myfunc)
                            var query = {
                              log_id: receipt.logs[n].id
                            };
                            dbo.collection("funcs").find(query).toArray(function (err, result) {
                              if (result == "") {
                                dbo.collection("funcs").insertOne(myfunc, function (err, res) {
                                  if (err) throw err;
                                  console.log("1 document inserted");
                                });
                              }
                            });
                            // }                     
                          }
                          if (count === 4) {
                            var decode3 = web3.eth.abi.decodeParameters([para1, para2, para3, para4], para)
                            // if(e.to === "0x0000000000000000000000000000000000023456") {
                            let myfuncs = 'dex ' + b + para1 + ': ' + decode3["0"] + ', ' + para2 + ': ' + decode3["1"] + ', ' + para3 + ': ' + decode3["2"] + ', ' + para4 + ': ' + decode3["3"] + ')'
                            let myfunc = {
                              function: myfuncs,
                              blockNumber: receipt.blockNumber,
                              log_id: receipt.logs[n].id
                            };
                            console.log(myfunc)
                            var query = {
                              log_id: receipt.logs[n].id
                            };
                            dbo.collection("funcs").find(query).toArray(function (err, result) {
                              if (result == "") {
                                dbo.collection("funcs").insertOne(myfunc, function (err, res) {
                                  if (err) throw err;
                                  console.log("1 document inserted");
                                });
                              }
                            });
                            // }                     
                          }
                          if (count === 5) {
                            var decode4 = web3.eth.abi.decodeParameters([para1, para2, para3, para4, para5], para)
                            // if(e.to === "0x0000000000000000000000000000000000023456") {
                            let myfuncs = 'dex ' + b + para1 + ': ' + decode4["0"] + ', ' + para2 + ': ' + decode4["1"] + ', ' + para3 + ': ' + decode4["2"] + ', ' + para4 + ': ' + decode4["3"] + ', ' + para5 + ': ' + decode4["4"] + ')'
                            let myfunc = {
                              function: myfuncs,
                              blockNumber: receipt.blockNumber,
                              log_id: receipt.logs[n].id
                            };
                            console.log(myfunc)
                            var query = {
                              log_id: receipt.logs[n].id
                            };
                            dbo.collection("funcs").find(query).toArray(function (err, result) {
                              if (result == "") {
                                dbo.collection("funcs").insertOne(myfunc, function (err, res) {
                                  if (err) throw err;
                                  console.log("1 document inserted");
                                });
                              }
                            });
                            // }                     
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
})