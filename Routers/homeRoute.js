const express = require('express')
const HomeController = require("../Controller/homeController.js")

let controller = new HomeController
const router = express.Router()
router.get('/home',controller.home)
module.exports = router
