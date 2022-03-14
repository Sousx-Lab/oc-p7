const API = {
    /**
     * @returns http://localhost:3000/api
     */
    BASE_ROUTE: 'http://localhost:3000/api',

    /**
     * @returns {string} User ROUTE
     * http://localhost:3000/api/user
     */
    get USER_ROUTE(){return `${this.BASE_ROUTE}/user`},

    /**
     * @returns {string} Posts ROUTE
     * http://localhost:3000/api/posts
     */
    get POSTS_ROUTE(){return `${this.BASE_ROUTE}/posts`},

    /**
     * @returns {string} Comments ROUTE
     * http://localhost:3000/api/comments
     */
     get COMMENTS_ROUTE(){return `${this.BASE_ROUTE}/comments`}
}

export const UserApi = {

    /**
    * @returns {string} Login user
    * POST: http://localhost:3000/api/user/login
    */
    get login(){return `${API.USER_ROUTE}/login`},

    /**
     * @returns {string} Singup user
     * POST: http://localhost:3000/api/user/singup
     */
    get signUp(){return `${API.USER_ROUTE}/signup`},

    /**
     * @returns {string} Referesh token
     * POST: http://localhost:3000/api/user/refresh-token
     */
    get refreshToken(){`${API.USER_ROUTE}/referesh-token`},

    /**
     * @returns {string} Logout user
     * GET: http://localhost:3000/api/user/logout
     */
    get logout(){return `${API.USER_ROUTE}/logout`},

    /**
     * @param {string} id
     * @returns {string} Get user
     * GET: http://localhost:3000/api/user/{id}
     */
    getOneById(id){return `${API.USER_ROUTE}/${id}`},

    /**
     * @param {string} id
     * @returns {string} Update user
     * PUT: http://localhost:3000/api/user/{id}
     */
     updateById(id){return `${API.USER_ROUTE}/${id}`},

    /**
     * @param {string} id
     * @returns {string} Delete user
     * DELETE: http://localhost:3000/api/user/{id}
     */
    deleteById(id){return `${API.USER_ROUTE}/${id}`},

     /**
      * @returns {string} Password forgotten
      * POST: http://localhost:3000/api/user/password-fogot
      */
    get forgottenPassword(){return `${API.USER_ROUTE}/password-fogot`},

    /**
      * @returns {string} Password reset
      * POST: http://localhost:3000/api/user/password-reset
      */
    get resetPassword(){return `${API.USER_ROUTE}/password-reset`},

}

export const PostsApi = {

    /**
     * @returns {string}
     * GET: http://localhost:3000/api/posts/
     */
    get getAll(){return `${API.POSTS_ROUTE}/`},

    /**
     * @param {string} id Post id
     * @returns {string} GET:
     * http://localhost:3000/api/posts/{id}
     */
    getOneById(id){return `${API.POSTS_ROUTE}/${id}`},

    /**
     * @returns {string} 
     * POST: http://localhost:3000/api/posts/
     */
    get create(){return `${API.POSTS_ROUTE}/`},

    /**
     * @param id Post id
     * @returns {string} 
     * PUT: http://localhost:3000/api/posts/{id}
     */
    updateById(id){return `${API.POSTS_ROUTE}/${id}`},

    /**
     * @param id Post id
     * @returns {string} 
     * DELETE: http://localhost:3000/api/posts/{id}
     */
    deleteById(id){return `${API.POSTS_ROUTE}/${id}`},

    /**
     * @param id Post id
     * @returns {string} 
     * POST: http://localhost:3000/api/posts/like/{id}
     */
    like(id){return `${API.POSTS_ROUTE}/like/${id}`},
}

export const CommentsApi = {

    /**
     * @param {string} id Comment id
     * @returns 
     * GET: http://localhost:3000/api/comments/{id}
     */
    getOneById(id){return `${API.COMMENTS_ROUTE}/${id}`},

    /**
     * @param {string} id Post id
     * @returns 
     * POST: http://localhost:3000/api/comments/{id}
     */
    createByPostId(id){return `${API.COMMENTS_ROUTE}/{id}`},

     /**
     * @param {string} id Comment id
     * @returns 
     * PUT: http://localhost:3000/api/comments/{id}
     */
    updateById(id){return `${API.COMMENTS_ROUTE}/{id}`},

    /**
     * @param {string} id Comment id
     * @returns 
     * DELETE: http://localhost:3000/api/comments/{id}
     */
    deleteById(id){return `${API.COMMENTS_ROUTE}/{id}`},
}
