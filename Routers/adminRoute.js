const express = require('express');
const HomeController = require('../Controller/adminController')

let controller = new HomeController()
const router = express.Router()

router.get('/home',controller.homeAdmin)

module.exports = router