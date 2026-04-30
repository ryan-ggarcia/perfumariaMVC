const Dashboard = require('../Models/dashboardModel');
const usuarioModel = require('../Models/usuarioModel');
class AdminController{
    async homeAdmin(req,res){
        let data = await Dashboard.getDashboardData();
        // let obter = new usuarioModel()
        let id =  req.cookies ? req.cookies.UsuarioLogado : null
        // obter = await obter.obter(id)
        res.render('admin/home', data, );
    }
    async cadastro(req,res){
        res.render('admin/usuario/cadastrar')
    }
}

module.exports = AdminController