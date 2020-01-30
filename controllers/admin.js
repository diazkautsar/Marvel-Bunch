const { Admin, Hero, UserHero } = require('../models')

class AdminController {
    static adminLogin(req, res) {
        const msg = req.query.msg
        res.render('formadminlogin.ejs', { msg })
    }

    static login(req, res) {
        const payload = {
            username: req.body.username,
            password: req.body.password
        }
        Admin.findAll({
            where: {
                username: payload.username,
                password: payload.password
            }
        })
            .then(data => {
                if (data.length === 1) {
                    // res.send('login berhasil')
                    req.session.isLogin = true
                    res.redirect(`/admins/${data[0].id}/home`)
                } else {
                    // res.send('username/password salah')
                    const msg = 'username/password salah'
                    res.redirect(`/admins/login?msg=${msg}`)
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static adminHome(req, res) {
        const adminId = req.params.adminId
        const message = req.query.msg
        const promises = [
            Hero.findAll(), Admin.findByPk(adminId)
        ]
        Promise.all(promises)
            .then(data => {
                // res.send(data)
                res.render('homeAdmin.ejs', {
                    data: data[0],
                    admin: data[1],
                    message
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static formAddHero(req, res) {
        const id = req.params.adminId
        const error = req.query.err
        res.render('addhero.ejs', { id, err: error })
    }

    static addHero(req, res) {
        const payload = {
            name: req.body.name,
            link_image: req.body.link
        }
        const id = req.params.adminId
        Hero.create(payload)
            .then(data => {
                const msg = `sukses menambah hero: ${payload.name} YUHU`
                res.redirect(`/admins/${id}/home?msg=${msg}`)
            })
            .catch(err => {
                const error = err.errors[0].message
                res.redirect(`/admins/${id}/add?err=${error}`)
            })
    }

    static formEditHero(req, res) {
        const heroId = req.params.heroId
        const adminId = req.params.adminId
        const errorText = req.query.err
        Hero.findByPk(heroId)
            .then(data => {
                res.render('edithero.ejs', { data, adminId, errorText })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editHero(req, res) {
        const payload = {
            name: req.body.name,
            link_image: req.body.link
        }
        const adminId = req.params.adminId
        const heroId = req.params.heroId
        Hero.update(payload, {
            where: {
                id: heroId
            }
        })
            .then(data => {
                const msg = `sukses edit hero: ${payload.name}`
                res.redirect(`/admins/${adminId}/home?msg=${msg}`)
            })
            .catch(err => {
                const error = err.errors[0].message
                res.redirect(`/admins/${adminId}/${heroId}/edit?err=${error}`)
            })
    }

    static remove(req, res) {
        const heroId = req.params.heroId
        const adminId = req.params.adminId

        UserHero.destroy({
            where : {HeroId : heroId}
        })
        .then(function(data) {
            return Hero.destroy({
                where : {id : heroId}
            })
        })
        .then(data => {
            res.redirect(`/admins/${adminId}/home`)
        })
        .catch(err => {
            const error = 'REMOVE FAILED'
            res.redirect(`admins/${adminId}/home?msg=${error}`)
        })
    }

    static logout(req, res) {
        req.session.isLogin = false
        res.redirect('/')
    }
}

module.exports = AdminController