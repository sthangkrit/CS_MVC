const express = require('express')
const app = express()
const request = require('../controller/handle');

app.get('/test',(req,res)=>{
    res.send("Hello")
})

app.post('/FunctionName', async (req, res) => {
    try {
        // var result = await new request().Deposit(req.body)
        // res.send(result)
    } catch (error) {
        // res.send(error)
    }

})




module.exports = app