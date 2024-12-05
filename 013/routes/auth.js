const express = require('express')
const router = express.Router()
const passport = require('passport')

require('dotenv').config()

router.get('/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
)

router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        res.send({
            status: true,
            data: {
                id: req.user.id,
                name: req.user.displayName,
                fullName: req.user.name,
                email: req.user.emails[0].value,  // Assuming emails is an array
                provider: req.user.provider
            }
        })
    }
)

module.exports = router
