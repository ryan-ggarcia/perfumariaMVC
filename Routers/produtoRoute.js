const express = require("express")
const ProdutoController = require("../Controller/produtoController")

let controller = new ProdutoController
let router = express.Router()

router.get("/listar",controller.listarView)
router.get("/cadastrar",controller.cadastroView)

module.exports = router