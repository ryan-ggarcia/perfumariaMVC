const express = require('express');
const loginRoute = require('./Routers/loginRoute')
const usuarioRouter = require('./Routers/usuarioRoutes')
const expressEjsLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000
app.set('view engine','ejs');
app.set('layout', './layout.ejs')
// app.set('view', '../Views.ejs')

global.CAMINHO_DA_IMAGEM = '/img/produtos/'
app.use(express.static('Public'))
app.use(expressEjsLayouts)
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/login',loginRoute)
app.use('/usuario',usuarioRouter)
app.listen(port, ()=>{
    console.log(`Servidor Online na porta: ${port}`)
})