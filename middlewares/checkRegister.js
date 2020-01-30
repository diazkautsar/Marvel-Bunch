function check(req, res, next) {
    if (req.session.isLogin === true) {
        const error = `${req.session.iduser} ANDA SUDAH LOGIN`
        res.redirect(`/?msg=${error}`)
    } else {
        next()
    }
}

module.exports = check