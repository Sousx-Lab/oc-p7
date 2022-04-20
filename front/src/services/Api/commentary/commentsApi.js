import {CommentsApi} from '../../../config/Api/Api.Endpoint.config';
import {getUser} from '../security/authenticator';

/**
 * @param {string} postId
 * @param {FormData} data
 * @returns {Promise<any>}
 */
export async function createComment(postId, data) {
    let {xsrfToken} = await getUser();
    if (xsrfToken) {
        const response = fetch(CommentsApi.createByPostId(postId), {
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
 * @param {string} Id 
 * @returns {Promise<any>}
 */
export async function getCommentById(Id) {
    let {xsrfToken} = await getUser();
    if (xsrfToken) {
        const response = fetch(CommentsApi.getOneById(Id), {
            method: 'GET',
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
 * 
 * @param {string} id 
 * @param {FormData} data
 * @returns {Promise<any>}
 */
export async function updateComment(id, data) {
    let {xsrfToken} = await getUser();
    if (xsrfToken) {
        const response = fetch(CommentsApi.updateById(id), {
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
 * @param {string} Id 
 * @returns {Promise<any>}
 */
export async function deleteComment(Id) {
    let {xsrfToken} = await getUser();
    if (xsrfToken) {
        const response = fetch(CommentsApi.deleteById(Id), {
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