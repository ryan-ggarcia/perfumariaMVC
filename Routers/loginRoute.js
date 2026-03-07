const express = require('express')
const loginController = require('../Controller/loginController')

let controller = new loginController
const route = express.Router()
route.get('/',controller.login)
route.post('/efetuarLogin', controller.efetuarLogin)

module.exports = route