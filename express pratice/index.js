const express = require(express)
const app = express()
const indexRouter = require("./src/routes/home")
const productsRouter = require("./src/routes/products")
const logger = require("./src/middlewares/logger")


//logger
app.use(logger)

//路由
app.use(indexRouter)
app.use(productsRouter)





app.listen(3000)