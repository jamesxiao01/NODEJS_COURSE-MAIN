function logger(req, res, next) {
    console.log("log");
    next()
}


module.exports = logger