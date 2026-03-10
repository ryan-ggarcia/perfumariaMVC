const CadUserController = require('../Controller/cadastroUserController')
const express = require('express')

let controller = new CadUserController
const router = express.Router()

router.get('/',controller.cadUser)

module.exports = router
