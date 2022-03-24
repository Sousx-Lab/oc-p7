const { Token, ResetPassword} = require('../models/index');
const {jsonErrors} = require('../middlewares/http/http.json.errors');
const bcrypt = require('bcrypt');
const jwt = require('../middlewares/security/jwt');
const {cookieOptions} = require('../middlewares/http/cookie.options');
const crypto = require('crypto');
const {deleteFile} = require('../services/files/handle.files')
const userRespository = require('../repository/user.repository');
const { sendEmail } = require('../services/mailer/mailer');

/** 
 * SignUp 
 */
exports.signup = async(req, res, next) => {
    try {
        const user = await userRespository.User.build({...req.body, roles: []});
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
        const user = await userRespository.User.findOne({ where: {email: req.body.email}})
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
            profilePicture: user.profilePicture,
            expiresAt: Date.now() + parseInt(process.env.JWT_TOKEN_EXPIRES_IN,10),
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

        const user = await userRespository.User.findOne({where :{id: refreshToken.userId}})
        if(!user){
            return res.http.Unauthorized({error: {message: 'refresh token not match User'}});
        };
        
        if(new Date(`${refreshToken.expiresAt}`).getTime() < Date.now()){
            const newRefreshToken = crypto.randomBytes(128).toString('base64');
            await refreshToken.destroy();
            await Token.create({
                token: newRefreshToken,
                userId: user.id,
                expiresAt: Date.now() + parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRE_IN, 10)
            });
            res.cookie("refresh_token", newRefreshToken, {...cookieOptions, path: '/api/user/'});
        };

        const xsrfToken = crypto.randomBytes(64).toString('hex');
        res.cookie("access_token", jwt.jwtSign(user, xsrfToken), cookieOptions);
        
        return res.http.Ok({
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture,
            expiresAt: Date.now() + parseInt(process.env.JWT_TOKEN_EXPIRES_IN,10),
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

/**
 * Get User by id
 */
exports.getUserById = async (req, res, next) =>{
    try {
        const id = req.params.id
        const user = await userRespository.findOneJoinPostsComment(id);
        
        if(!user){
            return res.http.NotFound({error: {message: `User not found`}});
        }
        return res.http.Ok(user);
    } catch (error) {
        return jsonErrors(error, res);
    }
}

/**
 * Update User  
 */
exports.updateUserById = async(req, res, next) =>{
    try {
        if(req.ileValidationError?.error){
            return res.http.UnprocessableEntity({error: {message: req.fileValidationError.message}});
        }
        
        const user = await userRespository.User.findOne({where: {id: req.params.id}});
        if(!user){
            res.http.NotFound({error: {message: 'User not found!'}});
        }
        if(user.id !== req.user.id){
            return res.http.Forbidden({error: {message: "permission denied!"}});
        }
        const payload = {
            ...req.body,
            newPassword: req.body.newPassword ?? null,
            uploadedPicture: req.files?.profilePicture || null
        }
        if(!await bcrypt.compare(payload.currentPassword, user.password)){
            if(payload.uploadedPicture){
                deleteFile(payload.uploadedPicture[0].filename)
            }
            return res.http.BadRequest({error: {message: 'Invalid current Password'}});
        }
        
        await user.set({
            ...payload,
            roles: [],
            password: payload.newPassword ? await bcrypt.hash(payload.newPassword, 10): user.password,
            profilePicture: payload.uploadedPicture ? payload.uploadedPicture[0].filename: user.getDataValue('profilePicture')
        },{ individualHooks: true});

        await user.validate();
        if(user.previous('profilePicture') !== user.getDataValue('profilePicture')){
            deleteFile(user.previous('profilePicture'));
        }
        
        await user.save();

        const xsrfToken = crypto.randomBytes(64).toString('hex');
        res.cookie("access_token", jwt.jwtSign(user, xsrfToken), cookieOptions);

        return res.http.Ok({
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture,
            expriesAt: Date.now() + parseInt(process.env.JWT_TOKEN_EXPIRES_IN,10),
            xsrfToken: xsrfToken
        })
        
    } catch (error) {
        return jsonErrors(error, res)
    }
};

/**
 * Delete User  
 */
exports.deleteUserById = async (req, res, next) =>{
    try {
        const user = await userRespository.User.findOne({where : {id:  req.params.id}});
        if(!user){
            return res.http.NotFound({error: {message: `User not found`}});
        }
        if(user.id !== req.user.id && !req.user.roles.includes('ROLE_ADMIN')){
            return res.http.Forbidden({error: {message: "permission denied!"}});
        }
        if(req.signedCookies['refresh_token'] && !req.user.roles.includes('ROLE_ADMIN')){
            const refreshToken = await Token.findOne({ 
                where: {token: req.signedCookies['refresh_token']}
            });
            if(refreshToken){
                await refreshToken.destroy();
            }
            res.clearCookie('refresh_token');
            res.clearCookie('access_token');
        }
        deleteFile(user.getDataValue('profilePicture'));
        
        await user.destroy();

        return res.http.Ok({message: `User deleted !`});
    } catch (error) {
        return jsonErrors(error, res);
    }
}

/**
 * Forgot Password
 */
exports.forgotPassword = async(req, res, next) =>{
    try {
        let resetToken = await ResetPassword.findOne({where : {email: req.body.email}})
        if(resetToken){
            return res.http.UnprocessableEntity({error: {message: `A request already exists, please check your email or wait 15 minutes before making a new request.`}});
        }
        const user = await userRespository.User.findOne({where : {email: req.body.email}});
        if(!user){
            return res.http.UnprocessableEntity();
        }
        const Token = crypto.randomBytes(32).toString('base64').replace(/\W/g, '');
        await ResetPassword.create({
            token: Token,
            userId: user.id,
            email: user.email,
            expiresAt: Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE_AT, 10)
        })
        await sendEmail(
            user.email, 
            'Groupomania reset passowrd',
            'password.reset.html',
                {
                firstName: user.firstName,
                link: `${process.env.FRONT_HOST}/password-reset?token=${Token}`
                }
            )
        res.clearCookie('refresh_token');
        res.clearCookie('access_token');
        return res.http.Accepted({message: `Email sended at ${req.body.email}`});
    } catch (error) {
        jsonErrors(error, res)
    }
};

exports.resetPassowrd = async(req, res, next) => {
    try {
        const resetToken = await ResetPassword.findOne({where: {token: req.body.token}})
        if(!resetToken){
            return res.http.UnprocessableEntity({error: {message: 'Reset password token not exist.'}});
        }
        
        if(new Date(`${resetToken.expiresAt}`).getTime() < Date.now()){
            await resetToken.destroy();
            return res.http.UnprocessableEntity({error: {message: 'Reset password token expire. Please renew your request!'}});
        }
        const user = await userRespository.User.findOne({where: {id: resetToken.userId}});
        if(!user){
            return res.http.UnprocessableEntity();
        }
        user.password = await bcrypt.hash(req.body.password, 10);
        await user.save();
        await resetToken.destroy();

        res.clearCookie('refresh_token');
        res.clearCookie('access_token');
        return res.http.Created({message: 'User password has been successfully updated'});

    } catch (error) {
        return jsonErrors(error, res);
    }
};