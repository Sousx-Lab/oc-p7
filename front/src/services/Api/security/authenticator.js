import {UserApi} from '../../../config/Api/Api.Endpoint.config'

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
}
export const getUser = async () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
        if (user?.expriesAt <= Date.now) {
            try {
                const user = await fetch(UserApi.refreshToken, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {...headers, 'x-xsrf-token': user?.xsrfToken}
                })
                saveUser(user);
                return user
            } catch (error) {
                return null;
            }
        }
        return user
    }
    return null;
}

export const saveUser = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
}

export const login = async credentials => {
   
    const response = await fetch(UserApi.login, {
        body: JSON.stringify(credentials),
        method: 'POST',
        credentials: 'same-origin',
        headers: headers
    })
    let data = await response.json()
    if (response.status === 200) {
        saveUser(data)
        return {
            user: data,
            error: null
        }
    }
    return {
        user: null,
        error: data.error
    }

}