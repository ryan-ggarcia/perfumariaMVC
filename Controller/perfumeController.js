const listaPerfumes = [
    'Oboticario'
]

class perfumeController{

    exibiPerfu(req,res){
        res.render('Perfumes', {listaPerfumes})
    }
    cadastrar(req,res){
        res.render('cadPerfumes')
    }
    efetuarCad(req,res){
       listaPerfumes.push(req.body.perfume)
       res.redirect('/Perfumes')
    }
}
module.exports = perfumeController