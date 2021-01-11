//Import
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '1234diopmoustapha5s2ffall';

// Fonction a exportée

module.exports = {
    generateTokenForUsers: function(usersData){
        return jwt.sign({
            usersId : usersData.id
        },
        JWT_SIGN_SECRET,
        {
          expiresIn: '0.25h' //temps expiration du token
        })
    }
}