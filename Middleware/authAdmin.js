const UsuarioModel = require("../Models/usuarioModel")

class AuthAdmin {
    async validarAdmin(req, res, next) {
        if (req.cookies.UsuarioLogado != undefined && req.cookies.UsuarioLogado != null) {

            let userId = req.cookies.UsuarioLogado
            let model = new UsuarioModel()
            model = await model.obter(userId)
            if(model != null){
                if(model.usu_perfil == 2 || model.usu_perfil == 4){
                    next()
                }else{
                    res.redirect('/login')
                }
            }else{
                res.redirect('/login')
            }
        }else{
            res.redirect('/login')
        }

    }
    adminLayout(req, res, next) {
        res.locals.layout = './layouts/admin'
        next()
    }

}

module.exports = AuthAdmin