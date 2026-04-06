const express = require('express')
const UserController = require('../Controller/usuarioController')

let controller = new UserController
const router = express.Router()

router.get('/listar',controller.listar)
router.get('/cadastrar',controller.cadastrar)
router.post('/efetuarCadastro',controller.efetuarCadastro)
router.post('/deletar',controller.deletar)

module.exports = router