import {UserApi} from '../../../config/Api/Api.Endpoint.config'
import {User, isUserObject} from '../user/user';
import { headers } from '../headers';

/**
 * @returns {Promise|null} User | null
 */
export async function getUser(){
    /**
     * @type {User|null}
     */
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (isUserObject(user)) {
        if(user.expiresAt <= Date.now()) {
            return await refreshToken(user.xsrfToken)
        }
        return user;
    }
    return null;
}

/**
 * 
 * @param {string} xsrfToken 
 */
async function refreshToken(xsrfToken){
    try {
        const response = await fetch(UserApi.refreshToken, {
            method: 'POST',
            credentials: 'include',
            headers: {...headers, 'x-xsrf-token': xsrfToken}
        })
        
        if(response.ok){
            let refreshedUser = await response.json();
            saveUser(refreshedUser);
            return refreshedUser;
        }
        window.localStorage.removeItem('user')
        return null
    } catch (error) {
        window.localStorage.removeItem('user')
        return null
    }
}

/**
 * @param {User} data
 */
export async function saveUser(data){
    try {
        window.localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
        throw error;
    }
    
}

/**
 * 
 * @param {object} credentials
 * @returns {Promise} {user, error, status}
 */
export async function login(credentials){
    const response = await fetch(UserApi.login, {
        body: JSON.stringify(credentials),
        method: 'POST',
        credentials: 'include',
        headers: headers
    })
    let data = await response.json()
    if(response.ok) {
        if(isUserObject(data)) {
        saveUser(data)
        return {
            user: data,
            error: null,
            status: null
            }
        }
    }
    return {
        user: null,
        error: data.error,
        status: response.status
    }
}

/**
 * 
 * @param {object} credentials 
 * @returns 
 */
export async function signup(credentials) {
    const response = await fetch(UserApi.signUp, {
        body: JSON.stringify(credentials),
        method: 'POST',
        headers: headers
    });
    let validationError = await response.json()
    if(response.ok) {
        validationError = null
    }
    return validationError;
}

/**
 * @param {User} user 
 * @returns {Promise}
 */
export async function logout(user){
    if(user){
        await fetch(UserApi.logout, {
            method: 'GET',
            credentials: 'include',
            headers: {...headers, 'x-xsrf-token': user?.xsrfToken}
        })
        window.localStorage.removeItem('user')
    }
    
}

/**
 * 
 * @param {object} credentials 
 * @returns {Promise}
 */
export async function forgotPassword(credentials){
    const response = await fetch(UserApi.forgottenPassword, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: headers
    })
    const data = await response.json()
    if(response.ok){
        return {
            error: false,
            status: response.status
        }
    }
    return {
        error: data?.error ?? true,
        status: response.status
    }
}

/**
 * 
 * @param {object} credentials 
 * @returns {Promise}
 */
export async function resetPassword(credentials){
    const response = await fetch(UserApi.resetPassword,{
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: headers
    })

    const data = await response.json();
    if(response.ok){
        return {
            error: false,
            status: response.status
        }
    }
    return {
        error: data,
        status: response.status
    }
}

