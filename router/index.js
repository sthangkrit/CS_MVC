const express = require('express')
const app = express()
const request = require('../controller/handle');

// const data = require('../db')

app.get('/test', (req, res) => {
    res.send("Hello")
})


app.post('/login', (req, res) => {

    var result = new request().login(req.body)
    res.send(result)
})

app.get('/count', (req, res) => {
    var result = new request().count()
    res.status(200)
    res.json(result)
})

module.exports = app