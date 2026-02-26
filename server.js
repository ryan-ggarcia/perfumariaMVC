const express = require('express');
const homeRoute = require('./Routers/homeRoute')
const perfumeRoute = require('./Routers/perfumeRoute')
const app = express()
const port = 3000
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}))
app.use('/',homeRoute)
app.use('/Perfumes',perfumeRoute)

app.listen(port, ()=>{
    console.log(`Servidor Online na porta: ${port}`)
})