const { User } = require('../models/index');
const httpStatus = require('../middlewares/http/http.status')
const {jsonErrors} = require('../middlewares/http/http.json.errors');
const bcrypt = require('bcrypt');

/**SignUp */
exports.signup = async(req, res, next) => {
    try {
        const user = await User.build({...req.body})
        await user.validate()
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        return res.status(httpStatus.HTTP_CREATED).json(user);
    } catch (error) {
        return jsonErrors(error, res);
    }
}

/**Login */
exports.login = (req, res, next) => {
    return res.status(200).json('Hello Login controller');
}