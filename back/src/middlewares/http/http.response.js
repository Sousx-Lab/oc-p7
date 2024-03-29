const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_ACCEPTED = 202
const HTTP_NO_CONTENT= 204;
const HTTP_MOVEDPEEMANENTLY = 301;
const HTTP_SEE_OTHER = 303;
const HTTP_TEMPORARY_REDIRECT= 307;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_FORBIDDEN = 403;
const HTTP_NOT_FOUND = 404;
const HTTP_UNPROCESSABLE_ENTIITY = 422;
const HTTP_SERVER_ERROR = 500;


class HTTPResponse {
    
    constructor(res){
        this.res = res
    }
    /**
     * @param {object|String|null} message 
     * @returns status code 200 & json message | " "
     */
    Ok(message = ''){
        return this.res.status(HTTP_OK).json(message);
    }

    /**
     * @param {object|String|null} message 
     * @returns status code 201 & json message | " "
     */
    Created(message = ''){
        return this.res.status(HTTP_CREATED).json(message);
    }

    /**
     * @param {object|String|null} message 
     * @returns status code 201 & json message | " "
     */
    Accepted(message = ''){
        return this.res.status(HTTP_ACCEPTED).json(message);
    }

    /**
     * @returns status code 204
     */
    NoContent(){
        return this.res.status(HTTP_NO_CONTENT).end()
    }

    /**
     * @param {object|String|null} message 
     * @returns status code 400 & json message | " "
     */
    BadRequest(message = ''){
        return this.res.status(HTTP_BAD_REQUEST).json(message);
    }

    /**
     * @param {object|String|null} message 
     * @returns status code 401 & json message | " "
     */
    Unauthorized(message = ''){
        return this.res.status(HTTP_UNAUTHORIZED).json(message);
    }
    
    /**
     * @param {object|String|null} message 
     * @returns status code 403 & json message | " "
     */
    Forbidden(message = ''){
        return this.res.status(HTTP_FORBIDDEN).json(message);
    }

    /**
     * @param {object|String|null} message 
     * @returns status code 404 & json message | " "
     */
    NotFound(message = ''){
        return this.res.status(HTTP_NOT_FOUND).json(message);
    }

    /**
     * @param {object|String|null} message 
     * @returns status code 422 & json message | " "
     */
    UnprocessableEntity(message = ''){
        return this.res.status(HTTP_UNPROCESSABLE_ENTIITY).json(message);
    }

    /**
     * @param {object|String|null} message 
     * @returns status code 500 & json message | " "
     */
    ServerError(message = ''){
        return this.res.status(HTTP_SERVER_ERROR).json(message);
    }

    /**
     * @param {string|null} path 
     * @returns status code 303 
     */
    SeeOther(path = '/'){
        return this.res.redirect(HTTP_SEE_OTHER, path);
    }
    
    /**
     * @param {string|null} path 
     * @returns status code 301
     */
    MovedPermanently(path = '/'){
        return this.res.redirect(HTTP_MOVEDPEEMANENTLY, path);
    }

    /**
     * @param {string|null} path 
     * @returns status code 307
     */
    TemporaryRedirect(path = '/'){
        return this.res.redirect(HTTP_TEMPORARY_REDIRECT, path);
    }
}

module.exports = (req, res, next) => {
    return (req, res, next) => {
        res.http = new HTTPResponse(res)
        next();
    }
}
