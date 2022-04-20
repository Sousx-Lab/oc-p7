import {headers} from '../headers';
import {PostsApi} from '../../../config/Api/Api.Endpoint.config';
import {getUser} from '../security/authenticator';

/**
 * @returns {Promise<any>}
 */
export async function getAll() {
    let {xsrfToken} = await getUser();
    if (xsrfToken) {
        const response = fetch(PostsApi.getAll, {
            credentials: 'include',
            headers: {
                ...headers,
                'x-xsrf-token': xsrfToken
            }
        })
        return (await response).json();
    }
    return {}
}

/**
 * @param {string} id 
 * @returns {Promise<any>}
 */
export async function getPostById(id) {
    let {xsrfToken} = await getUser();
    if (xsrfToken) {
        const response = fetch(PostsApi.getOneById(id), {
            method: 'GET',
            credentials: 'include',
            headers: {
                ...headers,
                'x-xsrf-token': xsrfToken
            }
        })
        return (await response).json();
    }
    return {}
}

/**
 * @param {FormData} data
 * @returns {Promise<any>}
 */
export async function createPost(data) {
    let {xsrfToken} = await getUser();
    if (xsrfToken) {
        const response = fetch(PostsApi.create, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'x-xsrf-token': xsrfToken
            },
            body: data
        })
        return response;
    }
    return null;
}

/**
 * 
 * @param {string} id 
 * @param {FormData} data 
 * @returns {Promise<any>}
 */
export async function updatePost(id, data) {
    let {xsrfToken} = await getUser();
    if (xsrfToken) {
        const response = fetch(PostsApi.updateById(id), {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'x-xsrf-token': xsrfToken
            },
            body: data
        })
        return response;
    }
    return null;
}
/**
 * 
 * @param {string} id 
 * @returns {Promise<any>}
 */
export async function deletePost(id) {
    let {xsrfToken} = await getUser();
    if (xsrfToken) {
        const response = fetch(PostsApi.deleteById(id), {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'x-xsrf-token': xsrfToken
            }
        })
        return response;
    }
    return null;
}

/**
 * @param {string} id 
 * @returns {Promise<any>}
 */
export async function LikePost(id) {
    let {xsrfToken} = await getUser();
    if (xsrfToken) {
        const response = fetch(PostsApi.like(id), {
            method: 'POST',
            credentials: 'include',
            headers: {
                ...headers,
                'x-xsrf-token': xsrfToken
            }
        })
        return response;
    }
    return null;
}