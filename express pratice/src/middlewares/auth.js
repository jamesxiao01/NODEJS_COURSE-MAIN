function auth(req, res, next) {
    console.log(req.query);

    if (req.query.admin === true) {
        next()
    } else {
        res.json({ message: Fuckoff })
    }
}

module.exports = auth