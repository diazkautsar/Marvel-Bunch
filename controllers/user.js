class UserController {
    static formRegister (req, res) {
        res.render('register.ejs')
    }

    static formLogin (req, res) {
        res.render('login.ejs')
    }
}

module.exports = UserController