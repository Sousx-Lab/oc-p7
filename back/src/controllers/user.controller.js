const { User, Token } = require('../models/index');
const {jsonErrors} = require('../middlewares/http/http.json.errors');
const bcrypt = require('bcrypt');
const jwt = require('../middlewares/security/jwt');
const crypto = require('crypto');

/**SignUp */
exports.signup = async(req, res, next) => {
    try {
        const user = await User.build({...req.body, roles: []});
        await user.validate()
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        return res.http.Created({message: "User was created succesfuly"});
    } catch (error) {
        return jsonErrors(error, res);
    }
}

/**Login */
exports.login = async(req, res, next) => {
    
    // console.log(req.signedCookies['access_token'])
    try {
        const user = await User.findOne({ where: {email: req.body.email}})
        if(!user){
            return res.http.BadRequest({error: {message: 'Email or password invalid'}});
        }
        if(!await bcrypt.compare(req.body.password, user.password)){
            return res.http.BadRequest({error: {message: 'Email or password invalid'}});
        }
        const refreshToken = crypto.randomBytes(128).toString('base64');
        const xsrfToken = crypto.randomBytes(64).toString('hex');
        
        const cookieOptions = {
            maxAge: parseInt(process.env.COOKIE_EXPIRES_AT, 10),
            httpOnly: true,
            signed: true,
            path: '/'
        }
       
        await Token.create({
            token: refreshToken,
            user_id: user.id, 
            expires_at: Date.now() + parseInt(process.env.JWT_TOKEN_EXPIRES_IN,10)
        });

        res.cookie("access_token", jwt.jwtSign(user, xsrfToken), cookieOptions);
        res.cookie("refresh_token", refreshToken, {...cookieOptions, path: '/token'});
        
        return res.http.Ok({xsrfToken: xsrfToken, });

    } catch (error) {
        return jsonErrors(error, res)
    }
    
}