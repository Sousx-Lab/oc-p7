const {jwtVerify} = require('./jwt');
const Response = require('../http/http.response');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwtVerify(token);
        const userId = decodedToken.userId;
        if(!userId){
            throw 'User ID not valide';
        }else{
            req.token = decodedToken;
            next();
        }
    } catch (error) {
        res.status(Response.HTTP_UNAUTHORIZED).json({error: error || 'Unauthorized request'});
    }
}