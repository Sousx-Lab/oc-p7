const { User, Token, Post, Comment, Sequelize } = require('../models/index');
const {jsonErrors} = require('../middlewares/http/http.json.errors');
const bcrypt = require('bcrypt');
const jwt = require('../middlewares/security/jwt');
const {cookieOptions} = require('../middlewares/http/cookie.options');
const crypto = require('crypto');

/** 
 * SignUp 
 */
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

/**
 * Login 
 */
exports.login = async(req, res, next) => {
    
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
        
        await Token.create({
            token: refreshToken,
            userId: user.id, 
            expiresAt: Date.now() + parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRE_IN, 10)
        });

        res.cookie("access_token", jwt.jwtSign(user, xsrfToken), cookieOptions);
        res.cookie("refresh_token", refreshToken, {...cookieOptions, path: '/api/user/'});
        
        return res.http.Ok({
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            expriesAt: Date.now() + parseInt(process.env.JWT_TOKEN_EXPIRES_IN,10),
            xsrfToken: xsrfToken
        });

    } catch (error) {
        return jsonErrors(error, res)
    }
};

/** 
 * Refresh token 
 */
 exports.refreshToken = async(req, res, next) => {
    try {
        const cookieRefreshToken = req.signedCookies['refresh_token']
        
        if(!cookieRefreshToken){
            return res.http.Unauthorized({error: {message: 'Missing refresh token'}});
        };

        const refreshToken = await Token.findOne({ where: {token: cookieRefreshToken}})
        if(!refreshToken){
            return res.http.Unauthorized({error: {message: 'Not found refresh token'}});
        };

        const user = await User.findOne({where :{id: refreshToken.userId}})
        if(!user){
            return res.http.Unauthorized({error: {message: 'refresh token not match User'}});
        };
        
        if(new Date(`${refreshToken.expiresAt}`).getTime() < Date.now()){
            const newRefreshToken = crypto.randomBytes(128).toString('base64');
            await refreshToken.destroy();
            await Token.create({
                token: newRefreshToken,
                user_id: user.id,
                expiresAt: Date.now() + parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRE_IN, 10)
            });
            res.cookie("refresh_token", newRefreshToken, {...cookieOptions, path: '/api/user'});
        };

        const xsrfToken = crypto.randomBytes(64).toString('hex');
        res.cookie("access_token", jwt.jwtSign(user, xsrfToken), cookieOptions);
        
        return res.http.Ok({
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            expriesAt: Date.now() + parseInt(process.env.JWT_TOKEN_EXPIRES_IN,10),
            xsrfToken: xsrfToken
        });

    } catch (error) {
        return jsonErrors(error, res);
    };

};

/** 
 * Logout 
 */
exports.logout = async(req, res, next) => {
    
    try {
        if(req.signedCookies['refresh_token']){
            const refreshToken = await Token.findOne({ 
                where: {token: req.signedCookies['refresh_token']}
            });
            if(refreshToken){
                await refreshToken.destroy();
            }
            res.clearCookie('refresh_token');
            res.clearCookie('access_token');
        }
        return res.http.Ok()
    } catch (error) {
        return jsonErrors(error, res);
    }
    
}
exports.getUserByid = async (req, res, next) =>{
    try {
        const user = await User.findOne({
            where : {id:  req.params.id},
            attributes: ['firstName', 'lastName', 'profilePicture'],
            include: [{
                model: Post,
                attributes: ['id', 'content', "media", 'updated_at', 'created_at', 'likes', 'users_liked',
                [Sequelize.fn('count', Sequelize.col('post_id')) ,'comments'], 
                ],
                order: [['created_at', 'DESC']] 
                },
                {
                model: Comment,
                attributes: []
                }
            ],
        });
        // 
        if(!user.firstName){
            return res.http.NotFound({error: {message: `User not found`}});
        }
        return res.http.Ok(user);
    } catch (error) {
        return jsonErrors(error, res);
    }
}

exports.deleteUser = async (req, res, next) =>{
    try {
        const user = User.findOne({where : {id:  req.user.id}});
        if(!user){
            return res.http.NotFound({error: {message: `User not found`}});
        }
        if(req.signedCookies['refresh_token']){
            const refreshToken = await Token.findOne({ 
                where: {token: req.signedCookies['refresh_token']}
            });
            if(refreshToken){
                await refreshToken.destroy();
            }
            res.clearCookie('refresh_token');
        }
        res.clearCookie('access_token');
        await user.destroy();
        delete req.user;
        return res.http.Ok({message: `User deleted !`});
    } catch (error) {
        return jsonErrors(error, res);
    }
}