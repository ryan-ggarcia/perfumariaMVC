
class CadUserController{
    cadUser(req,res){
        res.render('cadUser',{layout:false})
    }
    efetuarCadastro(req,res){
        // validação e envio de dados para o banco de dadods
    }

}

module.exports = CadUserController