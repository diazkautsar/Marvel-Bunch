const nodemailer = require('nodemailer')

function notif(value) {
    // console.log(value)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'keperluanlainlain77@gmail.com',
            pass: ''
        }
    })

    const mailOptions = {
        from: 'keperluanlainlain77@gmail.com',
        to: value,
        subject: 'selamat anda telah berhasil membuat akun di Marvel Bunch',
        html: '<p>mantap<p>'
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log("BERHAAASSSSIILLLLLLLLL")
            console.log(info)
        }
    })
}

module.exports = notif