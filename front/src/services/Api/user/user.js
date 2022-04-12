import {isEmptyObject} from '../../outils/objectValidator';
/**
 * @typedef User
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {array}  roles
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {number} expiresAt
 * @property {string} xsrfToken
 * @property {string} profilePicture
 * @property {string} bio
 */
export const User = {
    id: '',
    firstName: '',
    lastName: '',
    roles: [],
    createdAt: '',
    updatedAt: '',
    expiresAt: 0,
    xsrfToken: '',
    profilePicture: '',
    bio: '',
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