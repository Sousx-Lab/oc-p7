
/**
 * The regex is CNIL compliance and check if eight characters minimum, 
 * at least one uppercase letter, one lowercase letter and one number
 * @param {string} value 
 * @returns {string|boolean}
 */
exports.isValidPassword = (value) => {

    let validationErrors = []
    if(value.length < 8){
        validationErrors = [...validationErrors, "Password must contain at least 8 characters"];
    }

    if(!/(?=[A-Z]*[a-z])(?=[a-z]*[A-Z])[a-zA-Z-\d]+[À-ȕ0-9(),-_., ]/.test(value)){
        validationErrors = [...validationErrors, "Password must contain at least one lowercase and one uppercase letter"];
    }

    if(!/.*[0-9].*/.test(value)){
        validationErrors = [...validationErrors, "Password must contain at least one digit"];
    }

    if(validationErrors.length > 0){
        throw new Error(`${JSON.stringify(validationErrors)}`);
    }else{
        return true;
    }
    // if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)){
    //     throw new Error(
    //         "Password must contain at least 8 characters,\n"+
    //         "Password must contain one lowercase and one uppercase letter,\n" +
    //         "Password must contain at least one digit.")
    // }
    // return true;
}

/**
 * @param {string} value 
 * @returns {string|boolean}
 */
exports.isEmail = (value) => {
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
        throw new Error(`Email (${value}) is not valid`)
    }else{
        return true;
    }
}