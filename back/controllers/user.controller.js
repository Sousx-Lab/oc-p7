const User = require('../models/index').User;

/**SignUp */
exports.signup = (req, res, next) => {
    const user = {...req.body};
    User.create(user)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({message: err.message || 'Server Error'});
    });
}

/**Login */
exports.login = (req, res, next) =>{
    return res.status(200).json('Hello Login controller');
}