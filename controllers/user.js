const { User } = require('../models')

class UserController {
    static formRegister(req, res) {
        const err = req.query.err
        res.render('register.ejs', { err })
    }

    static register(req, res) {
        const payload = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
        User.create(payload)
            .then(data => {
                const msg = 'Sign Up Berhasil. Silahkan login untuk melanjtukan'
                res.redirect(`/users/login?msg=${msg}`)
            })
            .catch(err => {
                const error = err.errors[0].message
                res.redirect(`/users/register?err=${error}`)
            })
    }

    static formLogin(req, res) {
        const msg = req.query.msg
        res.render('login.ejs', { msg })
    }

    static login(req, res) {
        const payload = {
            username: req.body.username,
            password: req.body.password
        }
        User.findAll({
            where: {
                username: payload.username,
                password: payload.password
            }
        })
            .then(data => {
                // res.send(data)
                if (data.length === 1) {
                    res.redirect(`/users/${data[0].id}`)
                } else {
                    const msg = 'username/password salah'
                    res.redirect(`/users/login?msg=${msg}`)
                }
            })
            .catch(err => {
                res.send(err)
            })

    }
}

module.exports = UserController