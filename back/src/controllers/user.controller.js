const { User } = require('../models/index');
const {jsonErrors} = require('../middlewares/http/http.json.errors');
const bcrypt = require('bcrypt');

/**SignUp */
exports.signup = async(req, res, next) => {
    try {
        const user = await User.build({...req.body, roles: []});
        await user.validate();
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        return res.http.Created({message: "User was created succesfuly"});
    } catch (error) {
        return jsonErrors(error, res);
    }
}

/**Login */
exports.login = async(req, res, next) => {

    try {
        const user = await User.findOne({ where: {email: req.body.email}})
        if(!user){
            return res.http.UnprocessableEntity({error: {message: 'Email or password invalid'}});
        }
        if(!await bcrypt.compare(req.body.password, user.password)){
            return res.http.NotFound({error: {message: 'Email or password invalid'}});
        }
        return res.status(200).json({auth: "123456789"})
    } catch (error) {
        return jsonErrors(error, res)
    }
    
}