import {UserApi} from '../../../config/Api/Api.Endpoint.config'

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
}
export const getUser = async () => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
        if (user?.expriesAt <= Date.now()) {
            try {
                const response = await fetch(UserApi.refreshToken, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {...headers, 'x-xsrf-token': user?.xsrfToken}
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
            }
        }
        return user;
    }
    return null;
}

export const saveUser = (data) => {
    try {
        window.localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
        console.log(error)
    }
    
}

export const login = async credentials => {
   
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

export const logout = async() => {

    const user = JSON.parse(window.localStorage.getItem('user'))
    if(user){
        await fetch(UserApi.logout, {
            method: 'GET',
            credentials: 'include',
            headers: {...headers, 'x-xsrf-token': user?.xsrfToken}
        })
        window.localStorage.removeItem('user')
    }
    
}