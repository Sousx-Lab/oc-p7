
/**SignUp */
export function signup(req, res, next) {
    return res.status(200).json(req.body);
}

/**Login */
export function login(req, res, next) {
    return res.status(200).json('Hello Login controller');
}