const { jsonErrors } = require('../middlewares/http/http.json.errors');
const { Post, User } = require('../models/index');

/** 
 * Get All Posts 
 */
exports.getAllPosts = async (req, res, next) => {
    const limit = req.query.limit
    try {
        const posts = await Post.findAll({
            attributes: ['id', 'content', 'created_at', 'updated_at'],
            include: [{model: User, attributes: ['id', 'firstname', 'lastname', 'profile_picture']}], 
            order: [['created_at', 'DESC']] });
        
        return res.http.Ok(posts);
    } catch (error) {
        return jsonErrors(error, res);
    };   
};

/** 
 * Get One Post 
 */
exports.getOnePost = async(req, res, next) => {
    const id = req.params.id
    try {
        const posts = await Post.findOne({
            where: {id: id},
            attributes: ['id', 'content', 'created_at', 'updated_at'],
            include: [{model: User, attributes: ['id', 'firstname', 'lastname', 'profile_picture']}], 
            order: [['created_at', 'DESC']] });
        
        return res.http.Ok(posts);
    } catch (error) {
        return jsonErrors(error, res);
    };   
}

/**
 * Create One Post
 */
exports.createPost = async(req, res, next) => {
    
    return res.http.Ok('OK')
}