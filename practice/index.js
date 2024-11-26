const express = require("express")
const app = express()

// const FirstMiddleware = (req, res, next) => {
//     console.log("第一個")
//     next()
// }

// const SecondMiddleware = (req, res, next) => {
//     console.log("第二個")
//     next()
// }

// app.use(FirstMiddleware)
// app.use(SecondMiddleware)

app.use(logger)

app.get("/", (req, res) => {
    console.log("首頁");
    res.send("<h1>hello man</h1>")
})

app.get("/about", (req, res) => {
    console.log("關於");
    res.json({ message: "about" })
})

app.get("/users", auth, (req, res) => {
    console.log("users 頁面");
    res.json({ message: "users" })
})

function auth(req, res, next) {
    console.log(req.query);
    console.log("auth");
    next()

    if (req.query.admin === "true") {
        next()
        return
    }
    // res.send("<h1>你無權限</h1>")
    res.json({ message: "你沒權限" })
}

function logger(req, res, next) {
    console.log("log");
    next()
}


app.listen(3200)