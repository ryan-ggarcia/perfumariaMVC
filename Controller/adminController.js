const Dashboard = require('../Models/dashboardModel');
const usuarioModel = require('../Models/usuarioModel');
const PerfilModel = require('../Models/perfilModel')
const bcrypt = require('bcrypt')
class AdminController{
    async homeAdmin(req,res){
        let data = await Dashboard.getDashboardData();
        let id = req.cookies ? req.cookies.UsuarioLogado : null
        let user = null
        if (id) {
            try {
                const model = new usuarioModel()
                user = await model.obter(id)
            } catch (err) {
                console.error('Erro ao obter usuário:', err)
                user = null
            }
        }

        const locals = Object.assign({}, data, { user: user || {} })
        res.render('admin/home', locals)
    }
    async cadastro(req,res){
        let user = new usuarioModel()
        let perfil = new PerfilModel()
        perfil = await perfil.listar()
        user = await user.listar()
        res.render('admin/usuario/cadastrar', {user,perfil})
    }

    async efetuarCadastro(req,res){
        let ok = false
        let msg = ""
        const {nome,email,senha,perfil} = req.body
        if(nome && email && senha){
            let senhaHash = await bcrypt.hash(senha,10)
            let model = new usuarioModel(0,nome,email,senhaHash,perfil,0)
            let result = await model.cadastrar()

            if(!result){
                msg = "Erro ao enviar os dados!"
                return res.send({msg,ok})
            }
            ok = true
            return res.send({ok})

        }else{
            msg = "Os campos foram preenchidos incorretamente"
            return res.send({msg,ok})
        }
    }
}

module.exports = AdminController