const express = require("express")
const router = express.Router()
const auth = require("../middlewares/auth.js")

router.get("/products", auth, (req, res) => {
    console.log(產品頁)
    res.json({ message: "products" })
})

module.exports = router