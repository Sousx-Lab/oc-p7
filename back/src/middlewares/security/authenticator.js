const { jsonErrors } = require('../http/http.json.errors');
const {jwtVerify, jwtIsExpired} = require('./jwt');

const authenticator = async (req, res, next) => {
    try {
        const accessToken = req.signedCookies['access_token'];
        if(!accessToken){
            return res.http.Unauthorized({error: {message:'Missing access token'}})
        }

        const xsrfToken = req.headers['x-xsrf-token']
        if(!xsrfToken){
            return res.http.Unauthorized({error: {message: 'Missing xsrf token'}})
        }
        
        const decodedToken = jwtVerify(accessToken);
        if(decodedToken.xsrfToken !== xsrfToken){
            return res.http.Unauthorized({error: {message: 'xsrf token not match'}})
        }
        
        req.user = {
            id: decodedToken.sub, 
            firstname: decodedToken.firstname,
            lastname: decodedToken.lastname,
            roles: decodedToken.roles
        }
        if(req.originalUrl === "/api/user/refresh-token"){
            return next();
        }
        
        if(jwtIsExpired(decodedToken.exp)){
            return res.http.Unauthorized({error: {message: 'Expired access token'}});
        }

        next();
    } catch (error) {
        return jsonErrors(error, res)
    };
};
module.exports = authenticator;