//bibliotecas
const expressEjsLayouts = require('express-ejs-layouts')
const express = require('express');
const cookieParser = require('cookie-parser')

//require de Instanciação
const loginRoute = require('./Routers/loginRoute')
const adminRouter = require('./Routers/adminRoute')
const AuthAdmin = require('./Middleware/AuthAdmin')

//configurações
const app = express()
const port = 3000
app.set('view engine','ejs');
app.set('layout', './layouts/user')
app.set('views', './Views')
app.use(express.static('Public'))
app.use(expressEjsLayouts)
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser())

//Router Views
app.use('/login',loginRoute)

//Router Admin
let authAdmin = new AuthAdmin()
//Middleware para validar se o usuário é admin, para acessar as rotas de admin
app.use('/admin',authAdmin.validarAdmin)
//Middleware para layout de admin
app.use(authAdmin.adminLayout)
app.use('/admin',adminRouter)

app.listen(port, ()=>{
    console.log(`Servidor Online na porta: ${port} || http://localhost:${port}/login`)
})