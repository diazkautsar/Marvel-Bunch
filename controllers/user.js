const { User, Hero, UserHero } = require('../models')
const checkSuperHero = require('../helpers/checkSuperHero')

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
                // res.send(heroes)
                if (data.length === 1) {
                    res.redirect(`/users/${data[0].id}`)
                    // res.render('userPage', {heroes})
                } else {
                    const msg = 'username/password salah'
                    res.redirect(`/users/login?msg=${msg}`)
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static findOne(req, res) {
        let id = req.params.id
        let dataUser = ''
        User.findByPk(id)
            .then(function(data) {
                dataUser = data
                return UserHero.findAll({
                    include : [ Hero ],
                    where : {
                        UserId : id
                    }
                })
            })
            .then(function(heroes) {
                res.render('userPage', {dataUser, heroes})
            })
            .catch(function(err) {
                res.send(err)
            })
    }

    static playingMe(req, res) {
        let id = req.params.id
        res.render('pageToPlay', {id})
    }

    static findHero(req, res) {
        let idUser = req.params.id
        let idHero = null
        let numbers = req.body.number
        let heroGet = ''
        Hero.findAll()
            .then(function(heroes) {
                let id = checkSuperHero(numbers, heroes)
                idHero = id
                return Hero.findByPk(id)
            })
            .then(function(hero) {
                heroGet = hero
                let payload = {
                    UserId : idUser,
                    HeroId : idHero
                }
                return UserHero.create(payload)
            })
            .then(function(data) {
                res.render('getHeroPage', {heroGet})
            })
            .catch(function(err) {
                res.send(err)
            })
    }

    static getAll(req, res) {
        let id = req.params.id
        let dataUser = ''
        User.findByPk(id)
            .then(function(data) {
                dataUser = data
                return UserHero.findAll({
                    include : [ Hero ],
                    where : {
                        UserId : id
                    }
                })
            })
            .then(function(heroes) {
                console.log(heroes)
                res.render('usersListHeroes', {dataUser, heroes})
            })
            .catch(function(err) {
                res.send(err)
            })
    }

    static removeHero(req, res) {
        let idUser = req.params.idUser
        let idHero = req.params.idHero
        UserHero.destroy({
            where : {HeroId : idHero}
        })
        .then(function(data) {
            res.redirect(`/users/${idUser}/list`)
        })
    }
}

module.exports = UserController