const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const verified = jwt.verify(token, process.env.jwt_secret);
        if(verified){
            req.body.userIdFromToken= verified.userId;
            next();
        }
        else return res.send({
            success: false,
            message: 'Invalid Token'
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            message: 'Invalid Token'
        });
    }
}