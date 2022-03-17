import {UserApi} from '../../../config/Api/Api.Endpoint.config'
import {User, isUserObject} from './user';
import { headers } from '../headers';

/**
 * @returns {User|null} User | null
 */
export async function getUser(){
    /**
     * @type {User|null}
     */
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (isUserObject(user)) {
        if (user.expiresAt <= Date.now()) {
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
        console.log(error)
    }
    
}

/**
 * 
 * @param {object} credentials
 * @returns {array} array
 */
export async function login(credentials){
    const response = await fetch(UserApi.login, {
        body: JSON.stringify(credentials),
        method: 'POST',
        credentials: 'include',
        headers: headers
    })
    let data = await response.json()
    if (response.status <= 200) {
        saveUser(data)
        return {
            user: data,
            error: null
        }
    }
    return {
        user: null,
        error: data.error,
        status: response.status
    }
}

/**
 * @returns {void}
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