const UsuarioModel = require('../Models/usuarioModel')
class LoginController {
    loginView(req, res) {
        res.render('login')
    }
    async efetuarLogin(req, res) {
        const { email, senha } = req.body || {}
        if (!email || !senha) return res.status(400).send({ ok: false })
        const usuario = new UsuarioModel()
        const user = await usuario.buscarPorEmailSenha(email, senha)
        if (user) return res.send({ ok: true, user })
        return res.send({ ok: false })
    }
    
}
module.exports = LoginController