const httpStatus = require('./http.status');
const {response} = require('express')


/**
 * 
 * @param {Error} err 
 * @param {response} res 
 * @returns {response}
 */
exports.jsonErrors = (err, res) => {

    if ((Object.getPrototypeOf(err.constructor).name === 
        "ValidationError" || "BaseError")) {
        let error = {
            validationError: {}
        }
        err.errors.map(er => {
            error.validationError[er.path] = {
                meessage: er.message
            }
        });
        return res.status(httpStatus.HTTP_BAD_REQUEST).json(error);

    } else {
        return res.status(httpStatus.HTTP_SERVER_ERROR).json({error: {message: err.message } || 'Server Error'});
    }
}

/**
 * 
 * @param {string} str 
 * @returns {string|boolean}
 */
function isJson(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return false;
    }
}