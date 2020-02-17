var http = require('http');
var  Web3 = require('web3');
var Events = require('./Events');
var Items = require('./Items');


//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  console.log("ahacccdd")
  const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ws.nexty.io"))

  for (var i = 28588311-50000; i <= 28588311; i++) {
    web3.eth.getBlock(i, true, function(error, result){
      if (!error) {
        // console.log(result)
        if (result != null && result.transactions != null) {
            Items.forEach ((item) => {
              result.transactions.forEach( function(e) {
                let id = e.input.slice(2, 10)
                let para = '0x' + e.input.slice(11)
                // if (accAddress === e.from || accAddress === e.to) {
                  if (id !== "0x" && id === item.id) {
                    web3.eth.getTransactionReceipt(e.hash, function(err, receipt) {
                      if (!err && receipt.logs!== undefined && receipt.logs!== null) {
                        // console.log(receipt)
                        Events.forEach ((event) => {
                          for (let n = 0; n <= receipt.logs.length-1; n++) {
                            if(event.code === receipt.logs[n].topics[0]) {
                              // console.log(event.event, receipt.blockNumber)
                              let q = event.event.indexOf('(')
                              let w = event.event.slice(0,q+1)
                              let eventparam = web3.eth.abi.decodeLog(
                                event.inputs,
                                receipt.logs[n].data,
                                receipt.logs[n].topics)
                              if(event.inputs.length === 0) {
                                console.log('event ' + event.event, receipt.blockNumber)
                              }
                              if(event.inputs.length === 1) {
                                console.log('event ' + w + event.inputs['0'].name + ': ' + eventparam['0'] + ')', receipt.blockNumber)
                              }
                              if(event.inputs.length === 2) {
                                console.log('event ' + w + event.inputs['0'].name + ': ' + eventparam['0'] + ', ' + event.inputs['1'].name + ': ' + eventparam['1'] + ')', receipt.blockNumber)
                              }
                              if(event.inputs.length === 3) {
                                console.log('event ' + w + event.inputs['0'].name + ': ' + eventparam['0'] + ', ' + event.inputs['1'].name + ': ' + eventparam['1'] + ', ' + event.inputs['2'].name + ': ' + eventparam['2'] + ')', receipt.blockNumber)
                              }
                              if(event.inputs.length === 4) {
                                console.log('event ' + w + event.inputs['0'].name + ': ' + eventparam['0'] + ', ' + event.inputs['1'].name + ': ' + eventparam['1'] + ', ' + event.inputs['2'].name + ': ' + eventparam['2'] + ', ' + event.inputs['3'].name + ': ' + eventparam['3'] + ')', receipt.blockNumber)
                              }
                              if(event.inputs.length === 5) {
                                console.log('event ' + w + event.inputs['0'].name + ': ' + eventparam['0'] + ', ' + event.inputs['1'].name + ': ' + eventparam['1'] + ', ' + event.inputs['2'].name + ': ' + eventparam['2'] + ', ' + event.inputs['3'].name + ': ' + eventparam['3'] + ', ' + event.inputs['4'].name + ': ' + eventparam['4'] + ')', receipt.blockNumber)
                              }
                              var strip_comments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
                              var argument_names = /([^\s,]+)/g
                              var fnStr = item.function.replace(strip_comments, '')
                              var parameters = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(argument_names)
                              if(parameters === null) 
                                parameters = []
                                let para1 = parameters[0]
                                let para2 = parameters[1]
                                let para3 = parameters[2]
                                let para4 = parameters[3]
                                let para5 = parameters[4]
                                let count = parameters.length
                                let a = item.function.indexOf('(')
                                let b = item.function.slice(0,a+1)
                                // console.log(e)
                                if (count === 0) {
                                  console.log(e.from, item.function, e.blockNumber)
                                  console.log('')
                                }
                                if (count === 1) {
                                  var decode = web3.eth.abi.decodeParameters([para1], para)
                                  // if(e.to === "0x0000000000000000000000000000000000023456") {
                                    console.log('dex '+ b + para1 + ': ' + decode["0"]+')', e.blockNumber)
                                    console.log('')
                                  // } 
                                }
                                if (count === 2) {
                                  var decode1 = web3.eth.abi.decodeParameters([para1, para2], para)
                                  // if(e.to === "0x0000000000000000000000000000000000023456") {
                                    console.log('dex '+ b + para1 + ': ' + decode1["0"]+', ' +  para2 + ': ' + decode1["1"]+')', e.blockNumber)
                                    console.log('')
                                  // } 
                                }
                                if (count === 3) {
                                  var decode2 = web3.eth.abi.decodeParameters([para1, para2, para3], para)
                                  // if(e.to === "0x0000000000000000000000000000000000023456") {
                                    console.log('dex '+ b + para1 + ': ' + decode2["0"]+', '+ para2 + ': ' + decode2["1"]+', '+ para3 + ': ' + decode2["2"]+')', e.blockNumber)
                                    console.log('')
                                  // }                     
                                }
                                if (count === 4) {
                                  var decode3 = web3.eth.abi.decodeParameters([para1, para2, para3, para4], para)
                                  // if(e.to === "0x0000000000000000000000000000000000023456") {
                                    console.log('dex '+ b + para1 + ': ' + decode3["0"]+', '+ para2 + ': ' + decode3["1"]+', '+ para3+ ': ' + decode3["2"]+', '+ para5 + ': ' + decode3["3"]+')', e.blockNumber)
                                    console.log('')
                                  // }                     
                                }
                                if (count === 5) {
                                  var decode4 = web3.eth.abi.decodeParameters([para1, para2, para3, para4, para5], para)
                                  // if(e.to === "0x0000000000000000000000000000000000023456") {
                                    console.log('dex '+ b + para1 + ': ' + decode4["0"]+', '+ para2 + ': ' + decode4["1"]+', '+ para3+ ': ' + decode4["2"]+', '+ para4 + ': ' + decode4["3"]+', '+ para5 + ': ' + decode4["4"]+')', e.blockNumber)
                                    console.log('')
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

  res.end('loloaaccdsd'); //end the response
}).listen(8800); //the server object listens on port 8080