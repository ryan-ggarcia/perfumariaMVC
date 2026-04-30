const Dashboard = require('../Models/dashboardModel');
const usuarioModel = require('../Models/usuarioModel');
class HomeController{
    async homeAdmin(req,res){
        let data = await Dashboard.getDashboardData();
        let usuario = new usuarioModel();
        
        res.render('admin/home', data);
    }
    // try {
//     const data = await Dashboard.getDashboardData();
//     res.render('dashboard', data);
//   } catch (err) { next(err); }
}

module.exports = HomeController