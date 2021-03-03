require('dotenv').config()
import './config/passport'

const {app} = require('./app.js')

const port = process.env.PORT ?? 3000

app.listen(port)