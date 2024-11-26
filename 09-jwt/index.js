const express = require('express')
const dotenv = require('dotenv')

const authRouter = require('./auth')

dotenv.config()

const app = express()
app.use(express.json())


app.use('/auth', authRouter)

app.listen(3000, () => {
    console.log("server running");
})