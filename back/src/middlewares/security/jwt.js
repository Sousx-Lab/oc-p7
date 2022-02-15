const jwt = require('jsonwebtoken');

/**
 * @param {object} user 
 * @returns {object|Error}
 */
exports.jwtSign = (user, xsrfToken = null) => {
    try {
        if(typeof user !== "object" || !user?.id){
            throw 'User must be a object with id property';
        }
        return jwt.sign({
                roles: user.roles,
                ...(xsrfToken && {xsrfToken: xsrfToken}),
                },
                process.env.JWT_TOKEN_SECRET, 
                {
                expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRES_IN, 10) /1000,
                subject: user.id            
                }
            );
    } catch (error) {
        throw error;
    }
};

/**
 * @param {string} token 
 * @returns {object|Error}
 */
exports.jwtVerify = (token) => {
    try {
        if (!token || typeof token !== 'string') {
            throw 'Token must be a Json Web Token valid';
        }
        return jwt.verify(token, process.env.JWT_TOKEN_SECRET, {ignoreExpiration: true});
    } catch (error) {
        throw error;
    }
}
/**
 * @param {int} exp Timestamp
 * @returns {boolean}
 */
exports.jwtIsExpired = (exp) =>{
    try {
        if(new Date(exp * 1000).getTime() < Date.now()){
            return true
        }
        return false;
    } catch (error) {
        throw error
    }    
}