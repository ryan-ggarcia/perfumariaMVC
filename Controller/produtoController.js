const ProdutoModel = require("../Models/produtoModel")

class ProdutoController{
    listarView(req,res){
        res.render("produto/listar")
    }
    cadastroView(req,res){
        res.render("produto/cadastrar", {layout:false})
    }
    async efetuarCadastro(req,res){
        try {
            const { nome, marca, quant, preco, status, desc } = req.body || {}
            const file = req.file // multer will populate this when used in the route

            if (!nome || !marca || !quant || !preco) {
              return res.status(400).send({ ok: false, error: 'Campos obrigatórios faltando' })
            }

            const imagemPath = file ? (file.filename || file.path) : null

            let produto = new ProdutoModel(null, nome, marca, parseInt(quant), parseFloat(preco), imagemPath, status, desc)
            let result = await produto.cadastrar()
            return res.send({ ok: result })
          } catch (err) {
            console.error(err)
            return res.status(500).send({ ok: false })
          }
    }
}

module.exports = ProdutoController