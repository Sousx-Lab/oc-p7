

const API = {
    BASE_ROUTE: 'http://localhost:3000/api',
    get USER_ROUTE(){return `${this.BASE_ROUTE}/user`}
}

export const UserApi = {
    /**
    * @returns {string} Login Endpoint
    * 'http://localhost:3000/api/user/login',
    */
    get Login(){return `${API.USER_ROUTE}/login`},

    /**
     * @returns {string} Singup Endpoint
     * 'http://localhost:3000/api/user/singup',
     */
    get SignUp(){return `${API.USER_ROUTE}/signup`},

    /**
     * @returns {string} Referesh token Endpoint
     * 'http://localhost:3000/api/user/refresh-token',
     */
    get RefreshToken(){`${API.USER_ROUTE}/referesh-token`},

    /**
     * @returns {string} Logout Endpoint
     * 'http://localhost:3000/api/logout',
     */
    get Logout(){return `${API.USER_ROUTE}/logout`},
}
