const express = require("express")
const multer = require('multer')
const ProdutoController = require("../Controller/produtoController")

const storage = multer.diskStorage({
    destination: function(req, file, cb){ cb(null, "public/images") },
    filename: function(req, file, cb){ cb(null, Date.now() + '-' + file.originalname) }
})
const upload = multer({ storage })

let controller = new ProdutoController()
let router = express.Router()

router.get("/listar",controller.listarView)
router.get("/cadastrar",controller.cadastroView.bind(controller))
router.post("/efetuarCadastro", upload.single('image'), controller.efetuarCadastro.bind(controller))
router.post("/efetuarDelecao", controller.efetuarDelecao)
module.exports = router