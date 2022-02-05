const jwt = require('jsonwebtoken');

/**
 * @param {object} user 
 * @returns {object|Error}
 */
exports.jwtSign = function (user) {
    try {
        if(typeof user !== "object" || !user?.id || !user?.email ){
            throw 'User must be a object with id and email property';
        }
        return {
            userId: user.id,
            token: jwt.sign({

                    userId: user.id,
                    email: user.email
                },
                process.env.JWT_TOKEN_SECRET, {
                    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
                }
            )
        };
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