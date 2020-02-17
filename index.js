var http = require('http');
var  Web3 = require ('web3');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  console.log("ahacccdd")
  const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ws.nexty.io"))
  var subscription = web3.eth.subscribe('newBlockHeaders', function(error, result){
    if (!error) {
        console.log(result);

        return;
    }

    console.error(error);
  })
  .on("data", function(blockHeader){
      console.log(blockHeader);
  })
  .on("error", console.error);

  // unsubscribes the subscription
  subscription.unsubscribe(function(error, success){
      if (success) {
          console.log('Successfully unsubscribed!');
      }
  });
  res.end('loloaaccdd'); //end the response
}).listen(8880); //the server object listens on port 8080