const ProdutoModel = require("../Models/produtoModel")

class ProdutoController {
  async listarView(req, res) {
    let produtos = new ProdutoModel()
    let lista = await produtos.listar()
    res.render("produto/listar", { lista })
  }
  cadastroView(req, res) {
    res.render("produto/cadastrar", { layout: false })
  }
  async efetuarCadastro(req, res) {
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
  async efetuarDelecao(req,res){
    let ok = false
    let id = req.body.id
    let produto = new ProdutoModel()
    let result = produto.excluir(id)
    if(result){
      ok = true
    }
    res.send({ok})
  }
}

module.exports = ProdutoController