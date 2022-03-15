import {isEmptyObject} from '../../outils/outils';
/**
 * @typedef User
 * @property {number} expiresAt
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} profilePicture
 * @property {string} userId
 * @property {string} xsrfToken
 */
export const User = {
    expiresAt: 0,
    firstName: '',
    lastName: '',
    profilePicture: '',
    userId: '',
    xsrfToken: ''
}

/**
 * 
 * @param {User} user 
 */
export function isUserObject(user){
    if(isEmptyObject(user)){
        return false;
    }
    return Object.keys(user).every((key) => user.hasOwnProperty(key));
}