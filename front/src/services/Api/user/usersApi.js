import { UserApi } from "../../../config/Api/Api.Endpoint.config";
import { headers } from "../headers";
import { getUser } from "../security/authenticator";

/**
 * @param {string} id
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