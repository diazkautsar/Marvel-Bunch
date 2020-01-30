const nodemailer = require('nodemailer')

function notif(value) {
    // console.log(value)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'keperluanlainlain77@gmail.com',
            pass: '77karzai'
        }
    })

    const mailOptions = {
        from: 'keperluanlainlain77@gmail.com',
        to: value,
        subject: 'MARVEL BUNCH',
        text: 'makasih yah udah daftar. aku seneng deh kamu daftar'
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