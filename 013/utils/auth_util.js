const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

//hash 加密
const hashpassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
//比較密碼跟加密密碼
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

//產生jwt token
const generateToken = (userid) => {
    return jwt.sign({ userid }, SECRET_KEY, { expiresIn: '1h' })
}

module.exports = {
    hashpassword,
    comparePassword,
    generateToken
}