var brcryptjs = require('bcrypt')

function hashPassword (password){
    var salt = brcryptjs.genSaltSync(10)
    var hash = brcryptjs.hashSync(password, salt)
    return hash
}

module.exports = hashPassword