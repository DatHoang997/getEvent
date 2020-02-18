var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = { log_id: 'Highway ' };
  dbo.collection("events").find(query).toArray(function(err, result) {
    if (result == "") {
    console.log(result + "vcl?");
    }
    db.close();
  });
});