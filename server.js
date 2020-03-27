const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express')
var swaggerDoc = require('./swagger/swagger.json')

var port = process.env.port || 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/',require('./router/index'))
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.listen(port,function () {
    console.log('Start server at port 3000.')
    console.log('[Swagger] http://localhost:'+port+'/')
})