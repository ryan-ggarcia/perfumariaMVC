const PerfilModel = require('../Models/perfilModel')
class UserController{
    listar(req,res){
        res.render('usuario/listar')
    }
    cadastrar(req,res){
        const modelo = new PerfilModel()
        let lista = modelo.listar()
        res.render('usuario/cadastrar',{lista})
    }
    // efetuarCadastro(req,res){

    // }
}
module.exports = UserController