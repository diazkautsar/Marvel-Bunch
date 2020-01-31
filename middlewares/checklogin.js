function check(req, res, next) {
    if (req.session.isLogin === true) {
        next()
    } else {
        const error = 'ANDA HARUS LOGIN TERLEBIH DAHULU'
        res.redirect(`/users/login?msg=${error}`)
    }
}

module.exports = check