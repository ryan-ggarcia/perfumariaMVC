const ProdutoModel = require("../Models/produtoModel")

class ProdutoController{
    listarView(req,res){
        res.render("produto/listar")
    }
    cadastroView(req,res){
        res.render("produto/cadastrar", {layout:false})
    }
}

module.exports = ProdutoController