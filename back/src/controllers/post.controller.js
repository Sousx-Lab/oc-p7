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
        const post = await Post.findOne({
            where: {id: id},
            attributes: ['id', 'content', 'created_at', 'updated_at'],
            include: [{model: User, attributes: ['id', 'firstname', 'lastname', 'profile_picture']}], 
            order: [['created_at', 'DESC']] });
        if(post){
            return res.http.Ok(post);
        }
        return res.http.NotFound({error: {message: `Post id: ${id} not found`}});
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

/**
 * Update Post
 */
exports.updatePost = async(req, res, next) => {
    
    return res.http.Ok('OK')
}

/** 
 * Delete Post  
 */
exports.deletePost = async(req, res, next) => {
    const id = req.params.id
    try {
        const post = await Post.findOne({where: {id: id}});
        if(!post){
            return res.http.NotFound({error: {message: `Post id:"${req.params.id}" not found !`}});
        }
        if(post.user_id === req.user.id || req.user.roles.includes('ROLE_ADMIN')){
           await post.destroy();
           return res.http.Ok({message: `Post id:"${req.params.id}" deleted !`});
        }

        return res.http.Forbidden({error: {message: 'permission denied'}});
    } catch (error) {
        return jsonErrors(error, res);
    };   
}

/** 
 * Like UnLike Post 
 */
exports.likePost = async(req, res, next) => {
    
    return res.http.Ok('OK')
}