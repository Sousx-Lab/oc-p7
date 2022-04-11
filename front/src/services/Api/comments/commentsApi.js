import { CommentsApi } from '../../../config/Api/Api.Endpoint.config';
import { getUser } from '../security/authenticator';

/**
 * @param {string} postId
 * @param {FormData} data
 * @returns {Promise<any>}
 */
export async function createComment(postId, data){
    let { xsrfToken } = await getUser();
    if(xsrfToken){
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
