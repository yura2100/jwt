require('dotenv').config({path: __dirname + '/.env'})

const {app} = require('./app.js')

const port = process.env.PORT ?? 3000

app.listen(port)