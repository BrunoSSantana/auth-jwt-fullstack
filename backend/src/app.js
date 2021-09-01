const express = require('express')
const cors = require("cors")
const catchAll = require('./middlewares/catchAll')
const { routes } = require('./routes')

const app = express()

app.use(express.json())

app.use(cors());
app.use(routes)

app.use(catchAll)

app.listen(3003, () => console.log('Server is running in 3003'))