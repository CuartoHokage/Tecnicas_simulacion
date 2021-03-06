'use strict'

const express = require ('express');
const bodyParser= require('body-parser')
const app= express()
const hbs= require('express-handlebars')
var path = require('path');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const api= require('./routes')
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', hbs({
	defaultLayout: 'default',
	extname: '.hbs'
}))

app.set('view engine', '.hbs')

app.use('/api', api)
// app.get('/login', (req, res)=>{
// 	res.render('login')
// })
app.get('/lineaEspera', (req, res)=>{
	res.render('lineaEspera')
})
app.get('/montecarlo', (req, res)=>{
	res.render('montecarlo')
})

app.get('/metodo-congruencial', (req, res)=>{
	res.render('MetodoCongruencia')
})
app.get('/', (req, res)=>{
	res.render('index')
})
module.exports=app