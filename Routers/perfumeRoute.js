const express = require('express')
const perfumeController = require('../Controller/perfumeController')

let controller = new perfumeController
const router = express.Router()
router.get('/',controller.exibiPerfu)
router.get('/cadastro',controller.cadastrar)
router.post('/cadastro',controller.efetuarCad)

module.exports = router
