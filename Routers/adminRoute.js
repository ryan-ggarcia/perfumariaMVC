const express = require('express');
const AdminController = require('../Controller/adminController')

let controller = new AdminController()
const router = express.Router()

router.get('/home',controller.homeAdmin)
router.get('/register',controller.cadastro)

module.exports = router