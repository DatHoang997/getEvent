var _assign = require('lodash/assign')
var { Router } = require('express')
var event = require('./models/events')
var func = require('./models/funcs')
var BlockNumber = require('./models/blockNumber')

const router = Router()

const handlePageError = (res, e) => res.setStatus(500).send(e.message)

// Define CURD routes here..
// Ex: router.get(..)

module.exports =  router