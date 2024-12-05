const { PrismaClient } = require('@prisma/client')
const { hashPassword, comparePassword, generateToken } = require('../utils/auth_util')
const prisma = new PrismaClient()

module.exports = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body

            // hash password
            const hashedPassword = await hashPassword(password)

            await prisma.users.create({
                data: {
                    username,
                    email,
                    password: hashedPassword
                }
            })

            res.json({ message: '註冊成功' })
        } catch (err) {
            if (err.code === 'P2002') {
                res.status(409).json({ message: '帳號已存在' })
            } else {
                res.status(500).json({ error: err.message })
            }
        }
    }
}