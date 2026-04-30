const UsuarioModel = require("../Models/usuarioModel")

class loginController {
    login(req, res) {
        res.render('login', { layout: false })
    }
    async efetuarLogin(req, res) {
        let { email, senha } = req.body
        let msg = ""
        let ok = false
        let usuario = new UsuarioModel()
        usuario = await usuario.buscarPorEmailSenha(email, senha)
        if (usuario != undefined) {
            if (email == usuario.usu_email && senha == usuario.usu_senha) {
                ok = true
                let id = usuario.usu_perfil
                res.cookie('UsuarioLogado', usuario.usu_id)
                return res.send({ ok: ok, perfil: id })
            } else {
                msg = "Email ou senha incorretos"
                return res.send({ ok: ok, msg: msg })
            }
        } else {
            msg = "Email não encontrado"
            return res.send({ ok: ok, msg: msg })
        }
    }
}
module.exports = loginController