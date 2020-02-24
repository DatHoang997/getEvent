var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var routes = require('./routes')
var cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())

app.use(routes)

// Connect to MongoDB:
mongoose.connect(
  `mongodb://localhost:27017:8080/mydb`,
  { useNewUrlParser: true }
)

app.listen(8080, () => {
  console.log('Web server is listening on port 3000.')
})