const express = require('express');
const AdminController = require('../Controller/adminController')

let controller = new AdminController()
const router = express.Router()

router.get('/home',controller.homeAdmin)
router.get('/register',controller.cadastro)
router.post('./efetuarCadastro', controller.efetuarCadastro)

module.exports = router