import {isEmptyObject} from '../../outils/outils';
/**
 * @typedef User
 * @property {string} userId
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} profilePicture
 * @property {number} expiresAt
 * @property {string} xsrfToken
 */
export const User = {
    userId: '',
    firstName: '',
    lastName: '',
    profilePicture: '',
    expiresAt: 0,
    xsrfToken: ''
}

/**
 * @param {object} user object
 * @returns {boolean} 
 */
export function isUserObject(user){
    if(isEmptyObject(user)){
        return false;
    }
    return Object.keys(User).every((key) => user.hasOwnProperty(key));
}