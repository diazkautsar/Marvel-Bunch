const { User, Hero, UserHero, Question } = require('../models')
const checkSuperHero = require('../helpers/checkSuperHero')
const checkPassword = require('../helpers/checkPassword')
const check = require('../helpers/check')

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
                username: payload.username
            }
        })
            .then(data => {
                // res.send(heroes)
                const isValid = checkPassword(payload.password, data[0].password)
                if (data.length === 1 && isValid === true) {
                    req.session.isLogin = true
                    req.session.iduser = data[0].id
                    req.session.data = data[0].id
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
                res.render('userPage', {dataUser, heroes, id})
            })
            .catch(function(err) {
                res.send(err)
            })
    }

    static playingMe(req, res) {
        let id = req.params.id
        Question.findAll()
        .then(function(questions) {
            let index = Math.floor(Math.random() * questions.length)
            let question = questions[index].question
            res.render('pageToPlay', {id, question})
        })
        .catch(function(err) {
            res.send(err)
        })
        
    }

    static findHero(req, res) {
        let idUser = req.params.id
        let idHero = null
        let userAnswer = req.body.number
        let heroGet = null
        
        Question.findAll()
            .then(function(questions) {
                let statusQuestion = check(userAnswer, questions)
                if (statusQuestion) {
                    Hero.findAll()
                    .then(function(heroes) {
                        let id = checkSuperHero(heroes)
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
                        res.render('getHeroPage', {heroGet, id : idUser})
                    })
                    .catch(function(err) {
                        res.send(err)
                    })
                } else {
                   res.render('getHeroPage', {heroGet, id: idUser}) 
                }
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
                    }, 
                    attributes : ['id', 'UserId', 'HeroId']
                })
            })
            .then(function(heroes) {
                res.render('usersListHeroes', {dataUser, heroes, id})
            })
            .catch(function(err) {
                res.send(err)
            })
    }

    static removeHero(req, res) {
        let idUser = req.params.idUser
        let id = req.params.idUserHero
        UserHero.destroy({
            where : {id : id}
        })
        .then(function(data) {
            res.redirect(`/users/${idUser}/list`)
        })
    }

    static logout(req, res) {
        req.session.isLogin = false
        res.redirect('/')
    }
}

module.exports = UserController