const { jsonErrors } = require('../http/http.json.errors');
const {jwtVerify, jwtIsExpired} = require('./jwt');


const authenticator = (req, res, next) => {
    let authError;
    try {
        const accessToken = req.signedCookies['access_token'];
        if(!accessToken){
            return authError = () => {
                return res.http.Unauthorized({error: {message:'Missing access token'}})
            } 
        }

        const xsrfToken = req.headers['x-xsrf-token']
        if(!xsrfToken){
            return authError = () => {
                return res.http.Unauthorized({error: {message: 'Missing xsrf token'}})
            } 
        }
        
        const decodedToken = jwtVerify(accessToken);
        if(decodedToken.xsrfToken !== xsrfToken){
            return authError = () => {
                return res.http.Unauthorized({error: {message: 'xsrf token not match'}})
            } 
        }
        
        req.user = {
            id: decodedToken.sub, 
            firstname: decodedToken.firstname,
            lastname: decodedToken.lastname,
            roles: decodedToken.roles
        }
        if(req.originalUrl === "/api/user/refresh-token"){
            return authError = () =>{
                return next();
            }
        }
        
        if(jwtIsExpired(decodedToken.exp)){
            return authError = () => {
                return res.http.Unauthorized({error: {message: 'Expired access token'}});
            } 
        }
        
        return authError;
    } catch (error) {
        return jsonErrors(error, res)
    };
};

/**
 * 
 * @param {string} roles
 * @returns 
 */
const isGranted = (roles = 'ROLE_USER') => {
    return (req, res, next) => {
        const authError = authenticator(req, res, next)
        if(authError){
            return authError()
        }
        try {
            
            if(!req.user.roles.includes(roles)){
                return res.http.Forbidden({error: {message: 'access denied'}});
            }
            
            next();
        } catch (error) {
            return jsonErrors(error, res)
        }
    }
    
}
module.exports = isGranted;