const express = require('express')
const router = express.Router()
const db = require('../configs/db')

router.get('/', async (req, res) => {
    try {
        await db.query('SELECT * FROM monsters')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router