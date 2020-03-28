const express = require('express')
const app = express()
const request = require('../controller/handle');

app.get('/test', (req, res) => {
    res.send("Hello")
})

app.post('/Login', async (req, res) => {
    try {

        var result = await new request().Login(req.body)
        res.status(200)
        res.send(result)
    } catch (error) {
        res.status(400)
        res.send(error)
    }

})

app.post('/Report', async (req, res) => {
    try {
        var result = await new request().Report()
        res.status(200)
        res.send(result)
    } catch (error)
    {
        res.status(400)
        res.send(error)
    }

})


module.exports = app