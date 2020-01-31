var bcryptjs = require('bcrypt')
function checkPassword(password, passwordDB) {
    var result = bcryptjs.compareSync(password, passwordDB )
    return result
}

module.exports = checkPassword