const express = require('express')
const category = require('./src/category/category.routes')
const errors = require("./src/middleware/error")
const app = express()
const port = 3000

app.use(express.json())
app.use(errors.errorHandler)
app.use('/category',category);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))