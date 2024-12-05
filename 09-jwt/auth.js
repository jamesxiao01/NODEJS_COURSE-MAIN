const jwt = require('jsonwebtoken')
const express = require('express')
const bcrypt = require('bcrypt') // 加密密碼
const { PrismaClient } = require('@prisma/client') // 資料庫
const { z } = require('zod')

const prisma = new PrismaClient() // 建立 Prisma client
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

// zod 定義註冊 schema
const registerSchema = z.object({
  username: z
    .string()
    .min(3, '使用者名稱至少需要3個字元')
    .max(20, '使用者名稱不能超過20個字元'),
  password: z.string().min(8, '密碼至少需要8個字元'),
  email: z.string().email('請輸入正確的email'),
  age: z.number().min(13, '年齡必須大於13歲').optional(),
  phone_number: z.string().regex(/^09\d{2}-?\d{3}-?\d{3}$/)
})

// 驗證註冊 middleware
const validateRegister = (req, res, next) => {
  try {
    registerSchema.parse(req.body)
    next()
  } catch (error) {
    // zod 錯誤格式化
    const formattedErrors = error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message
    }))

    res.status(400).json({
      error: '驗證錯誤',
      details: formattedErrors
    })
  }
}

// 註冊
router.post('/register', validateRegister, async (req, res) => {
  try {
    const { username, password, email, age, phone_number } = req.body
    const hashedPassword = await bcrypt.hash(password, 10) // 對密碼進行加密處理

    await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        email,
        age,
        phone_number
      }
    })

    res.status(201).json({ message: '註冊成功' })
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ message: '使用者已存在' })
    }

    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 登入
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await prisma.users.findUnique({
      where: { username }
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: '帳號或密碼錯誤' })
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username
      },
      SECRET_KEY,
      {
        expiresIn: '1m' // 5m, 1d
      }
    )

    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: '沒提供 token' })
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'token 無效' })
    }

    req.user = user
    next()
  })
}

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user })
})

module.exports = router
