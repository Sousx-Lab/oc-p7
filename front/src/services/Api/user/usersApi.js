import { UserApi } from "../../../config/Api/Api.Endpoint.config";
import { headers } from "../headers";
import { getUser } from "../security/authenticator";

/**
 * @param {string} id
 * @returns {Promise<any>}
 */
export async function getUserById(id) {
    let { xsrfToken } = await getUser();
    if(xsrfToken){
        const response = fetch(UserApi.getOneById(id), {
        method: 'GET',
        credentials: 'include',
        headers: {...headers, 'x-xsrf-token': xsrfToken}
        })
        
        return (await response).json();
    }
    return {};
}

/**
 * @param {string} id 
 * @param {FormData} data 
 * @returns {Promise<Response>}
 */
export async function updateUser(id, data) {
    let { xsrfToken } = await getUser();
    if(xsrfToken){
        const response = fetch(UserApi.updateById(id), {
            body: data,
            method: 'PUT',
            credentials: 'include',
            headers: {'x-xsrf-token': xsrfToken},
        })
        return response;
        
    }
    return null;
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<Response>}
 */
export async function deleteUser(id) {
    let { xsrfToken } = await getUser();
    if(xsrfToken){
        const response = fetch(UserApi.deleteById(id), {
            method: 'DELETE',
            credentials: 'include',
            headers: {...headers, 'x-xsrf-token': xsrfToken}
        })
        
        return response;
    }
    return null;
}