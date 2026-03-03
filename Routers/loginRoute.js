const express = require('express')
const loginController = require('../Controller/loginController')

let controller = new loginController
const route = express.Router()
route.get('/',controller.login)

module.exports = route