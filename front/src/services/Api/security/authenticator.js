import {UserApi} from '../../../config/Api.config';

export const getUser = async () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (typeof user === 'object' & Object.keys(user).length >1) {
        if (user?.expriesAt <= Date.now) {
            try {
                const user = await fetch(UserApi.RefreshToken, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'x-xsrf-token': user?.xsrfToken
                    }
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
   
    const response = await fetch(UserApi.Login, {
        body: JSON.stringify(credentials),
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
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