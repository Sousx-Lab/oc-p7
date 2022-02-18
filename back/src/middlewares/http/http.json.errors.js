const {response} = require('express')

/**
 * @param {Error} err 
 * @param {response} res 
 * @returns {response}
 */
exports.jsonErrors = (err, res) => {
    
    const classErrorType = err.name

    if(classErrorType === "SequelizeConnectionRefusedError"){
        return res.http.ServerError({error: {message: "Database ConnectionRefusedError"} });
    }
    else if (classErrorType === "SequelizeValidationError" || classErrorType === "SequelizeUniqueConstraintError"){
        const jsonError = {validationError: {} }
        
        err.errors.map(er => {
            jsonError.validationError[er.path] = {
                message: er.message,
                context: {
                    label: er.path,
                    value: er.value,
                    invalids:[
                        er.value
                    ],
                    key: er.path,
                },
                type: er.type.replace(' ', '.')          
            }
        });
        return res.http.BadRequest(jsonError);
    
    } else {
        return res.http.ServerError({error: {message: err?.message } || 'Server Error'});
    }
}

/**
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