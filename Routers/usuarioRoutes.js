const express = require('express')
const LoginController = require('../Controller/usuarioController')
let controller = new LoginController()
const router = express.Router()

router.get('/login', controller.loginView.bind(controller))
router.post('/efetuarLogin', controller.efetuarLogin.bind(controller))

module.exports = router