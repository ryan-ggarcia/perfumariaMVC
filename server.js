const express = require('express');
const homeRoute = require('./Routers/homeRoute')
const loginRoute = require('./Routers/loginRoute')
const usuarioRouter = require('./Routers/usuarioRoutes')
const produtoRouter = require('./Routers/produtoRoute')
const expressEjsLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000
app.set('view engine','ejs');
app.set('layout', './layout.ejs')
// app.set('view', '../Views.ejs')
app.use(express.static('Public'))
app.use(expressEjsLayouts)
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/',homeRoute)
app.use('/login',loginRoute)
app.use('/usuario',usuarioRouter)
app.use('/produto',produtoRouter)
app.listen(port, ()=>{
    console.log(`Servidor Online na porta: ${port}`)
})