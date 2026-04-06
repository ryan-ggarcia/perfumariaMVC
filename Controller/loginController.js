const { render } = require("ejs")

class loginController {
    login(req, res) {
        res.render('login', { layout: false })
    }
    efetuarLogin(req, res) {
        
    }
}
module.exports = loginController