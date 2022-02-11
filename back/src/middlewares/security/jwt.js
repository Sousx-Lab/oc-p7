const jwt = require('jsonwebtoken');

/**
 * @param {object} user 
 * @returns {object|Error}
 */
exports.jwtSign = function (user, xsrfToken = null) {
    try {
        if(typeof user !== "object" || !user?.id || !user?.email ){
            throw 'User must be a object with id and email property';
        }
        return jwt.sign({
                roles: user.roles,
                ...(xsrfToken && {xsrfToken: xsrfToken}),
                },
                process.env.JWT_TOKEN_SECRET, 
                {
                expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRES_IN,10) /1000,
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
exports.jwtVerify = function (token) {
    try {
        if (!token || typeof token !== 'string') {
            throw 'Token must be a Json Web Token valid';
        }
        return jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    } catch (error) {
        throw error;
    }
}