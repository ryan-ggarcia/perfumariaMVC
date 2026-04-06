const PerfilModel = require('../Models/perfilModel')
const UsuarioModel = require('../Models/usuarioModel')
const Database = require('../utils/database')
class UserController{
    async listar(req,res){
        let usuario = new UsuarioModel()
        let lista = await usuario.listar()
        res.render('usuario/listar',{lista})
    }
    async cadastrar(req,res){
        const modelo = new PerfilModel()
        let lista = await modelo.listar()
        res.render('usuario/cadastrar',{lista,layout:false})
    }
    async efetuarCadastro(req,res){
        let ok = false
        let msg = ""
        let{nome,email,senha,perfil} = req.body
        let usuario = new UsuarioModel(null,nome,email,senha,perfil)
        let result = await usuario.cadastrar()
        if(nome && email && senha && perfil){
            if(result){
                ok = true
                msg = "Usuário cadastrado com sucesso!"
                window.location.href = "/usuario/listar"
            }else{
                msg = "Erro... Não foi possível cadastrar o usuário!"
            }
        }else{
            msg = "Erro... As informações inceridas estão incorretas!"
        }
        res.send({ok,msg})
    }
    async deletar(req,res){
        let ok = false
        let id = req.body.id
        let model = new UsuarioModel()
        let result = await model.excluir(id)
        if(result){
            ok = true
        }
        res.send({ok})
    }
}
module.exports = UserController