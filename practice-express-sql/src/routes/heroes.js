const express = require('express')
const router = express.Router()
const db = require('../configs/db')

router.get('/', async (req, res) => {
    try {
        await db.query('SELECT * FROM heroes')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


//id
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM heroes WHERE id = ?',
            [req.params.id])
        if (rows.length === 0)
            return res.status(404).json({ message: '找不到符合 ID' })
        res.json(rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//update
router.put('/:id', async (req, res) => {
    try {
        const { name, gender, age, hero_level, hero_rank, description } = req.body
        await db.query(
            'UPDATE heroes SET name = ?, gender = ?, age = ?, hero_level = ?, hero_rank = ?, description = ?'
            [name, gender, age, hero_level, hero_rank, description, req.params.id]
        )
        res.json({ message: "英雄更新" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})



module.exports = router