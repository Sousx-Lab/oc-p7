const {jwtVerify} = require('./jwt');

const auth = async (req, res, next) => {
    try {
        const accessToken = req.signedCookies['access_token'];
        const xsrfToken = req.headers['x-xsrf-token']
        if(!accessToken){
            return res.http.Unauthorized({error: {message: 'Unauthorized', reason: 'Missing access token'}})
        }
        if(!xsrfToken){
            return res.http.Unauthorized({error: {message: 'Unauthorized', reason: 'Missing xsrf token'}})
        }
        const decodedToken =  jwtVerify(accessToken);
        if(decodedToken.xsrfToken !== xsrfToken){
            return res.http.Unauthorized({error: {message: 'Unauthorized', reason: 'xsrf token not match'}})
        }
        
        next();
    } catch (error) {
        console.log(error);
    };
};

module.exports = auth;