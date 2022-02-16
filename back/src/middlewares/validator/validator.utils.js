
/**
 * The regex is CNIL compliance and check if eight characters minimum, 
 * at least one uppercase letter, one lowercase letter and one number
 * @param {string} value 
 * @param {function|null} helpers
 * @returns {string|boolean}
 */
exports.isValidPassword = (value, helpers = null) => {

    let validationErrors = []
    if(value.length < 8){
        validationErrors = [...validationErrors, "password must contain at least 8 characters"];
    }

    if(!/(?=[A-Z]*[a-z])(?=[a-z]*[A-Z])[a-zA-Z-\d]+[À-ȕ0-9(),-_., ]/.test(value)){
        validationErrors = [...validationErrors, "password must contain at least one lowercase and one uppercase letter"];
    }

    if(!/.*[0-9].*/.test(value)){
        validationErrors = [...validationErrors, "password must contain at least one digit"];
    }

    if(validationErrors.length > 0){
        if(helpers){
            return helpers.message((validationErrors).toLocaleString());
        }
        throw new Error(validationErrors.toString());
    }else{
        return true;
    }
}


exports.isHtmlTag = (value, helpers = null) =>{
    if(/(<([^>]+)>)/gi.test(value)){
        if(helpers){
            return helpers.message(`unauthorized characters: ${value}`);
        }
        throw new Error(`value (${value}) is not valid`) 
    }else{
        return true;
    }
}

/**
 * @param {any} value 
 * @returns {boolean|Error}
 */
exports.isString = (value) =>{
    if(typeof value !== "string"){
        throw new Error('value must be string')
    }
    return true;
}