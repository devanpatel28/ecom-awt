const express = require('express')
const category = require('./src/category/category.routes')
const product = require('./src/product/product.routes')
const variant = require('./src/variant/variant.routes')
const errors = require("./src/middleware/error")
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(errors.errorHandler)
app.use('/category',category);
app.use('/product',product);
app.use('/variant',variant);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))   