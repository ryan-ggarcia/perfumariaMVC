const UsuarioModel = require("../Models/usuarioModel")

class loginController {
    login(req, res) {
        res.render('login', { layout: false})
    }
    efetuarLogin(req, res) {
        let { email, senha } = req.body
        let msg = ""
        let ok = false
        let usuario = new UsuarioModel()
        usuario.validarLogin(email, senha)
        if (email && senha) {
            if (usuario != null) {
               res.send({ ok: true })
            } else {
                return res.send({ msg: "Email ou senha incorretos" })
            }
        } else {
            return res.send({ msg: "Preencha todos os campos obrigatórios" })
        }
    }
}
module.exports = loginController