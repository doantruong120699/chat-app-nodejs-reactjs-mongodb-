const jwt = require('jsonwebtoken');
const userService = require('../services/auth/user.service');

module.exports = (request, response, next)  => {
    let token = request.header('authorization');
    if (!token) return response.status(401).send({message: 'Access Denied'});
    // Remove Bearer from string
    token = token.replace(/^Bearer\s+/, "");
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, (err, decoded) => {
            if(err){
                console.log(err);
                response.status(401).send({message: 'Invalid Token'});
            } else {
                const userID = decoded.id;
                userService.getUserbyId(userID)
                    .then((user) => {
                        let plainUser = user.get({plain: true})
                        delete plainUser['password']
                        request.user = user;
                        request.isLoggedIn = true;
                        next();
                    })
                    .catch((err) => {
                        return response.status(400).send({message: 'Invalid Token'});
                    });
            }
        });
    } catch (err) {
        return response.status(400).send({message: 'Invalid Token'});
    }
};
