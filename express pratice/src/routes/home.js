const express = require("express")
const router = express.Router()


router.get("/", (req, res) => {
    console.log("首頁")
    res.json({ message: "home" })
})


module.exports = router