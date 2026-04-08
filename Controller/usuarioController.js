const PerfilModel = require('../Models/perfilModel')
const UsuarioModel = require('../Models/usuarioModel')
class UserController{
    async listar(req,res){
        let usuario = new UsuarioModel()
        let perfil = new PerfilModel()
        let lista = await usuario.listar()
        let listaPer = await perfil.listar()
        res.render('usuario/listar',{lista,listaPer})
    }
    async cadastrar(req,res){
        const modelo = new PerfilModel()
        let lista = await modelo.listar()
        res.render('usuario/cadastrar',{lista,layout:false})
    }
    async efetuarCadastro(req,res){
        let ok = false
        let{nome,email,senha,perfil} = req.body
        let usuario = new UsuarioModel(null,nome,email,senha,perfil)
        let result = await usuario.cadastrar()
        if(nome && email && senha && perfil){
            if(result){
                ok = true
            }else{
                ok = false
            }
        }else{
           ok = false
        }
        res.send({ok})
    }
    async update(req,res){
        let ok = false
        let {id, nome, email, perfil} = req.body
        let usuario = new UsuarioModel(id,nome,email,null,perfil)
        let result = await usuario.atualizar()
        if(result){

            ok = true
        }
        res.send({ok})
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
    async obter(req,res){
        let id = req.params.id
        let usuario = new UsuarioModel()
        let result = await usuario.obter(id)
        if(result){
            res.send({ok:true, usuario:{
                usu_id: result.usu_id,
                usu_nome: result.usu_nome,
                usu_email: result.usu_email,
                usu_perfil: result.usu_perfil
            }})
        } else {
            res.status(404).send({ok:false})
        }
    }
}
module.exports = UserController