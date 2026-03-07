const { render } = require("ejs")

class loginController {
    login(req, res) {
        res.render('login', { layout: false })
    }
    efetuarLogin(req, res) {
        let msg = ""
        let email = req.body.email
        let senha = req.body.senha

        if (email == 'teste@gmail' && senha == '123') {
            return res.redirect('/home')
        } else {
            msg = "Erro...Email ou senha incorreto!"
            return res.render('login', { msg, layout: false })
        }
    }
}
module.exports = loginController