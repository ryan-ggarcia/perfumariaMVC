const express = require('express');
const homeRoute = require('./Routers/homeRoute')
const perfumeRoute = require('./Routers/perfumeRoute')
const loginRoute = require('./Routers/loginRoute')
const expressEjsLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000
app.set('view engine','ejs');
app.set('layout', './layout.ejs')
app.use(express.static('Public'))
app.use(expressEjsLayouts)
app.use(express.urlencoded({extended:true}))
app.use('/',homeRoute)
app.use('/Perfumes',perfumeRoute)
app.use('/login',loginRoute)

app.listen(port, ()=>{
    console.log(`Servidor Online na porta: ${port}`)
})