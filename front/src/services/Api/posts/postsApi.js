import {headers} from '../headers';
import { PostsApi } from '../../../config/Api/Api.Endpoint.config';
import { getUser } from '../security/authenticator';

export async function getAll(){

    let { xsrfToken } = await getUser()
    
    const response = fetch(PostsApi.getAll, {
        credentials: 'include',
        headers: {...headers, 'x-xsrf-token': xsrfToken}
    })
    return (await response).json()

}