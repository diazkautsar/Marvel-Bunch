const { User, Hero, UserHero } = require('../models')

class UserController {
    static formRegister (req, res) {
        res.render('register.ejs')
    }

    static formLogin (req, res) {
        res.render('login.ejs')
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
                // res.send({user : dataUser, heroes : heroes})
            })
            .catch(function(err) {
                res.send(err)
            })
    }

    static playingMe(req, res) {
        res.render('pageToPlay')
    }
}

module.exports = UserController