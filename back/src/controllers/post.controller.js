const { jsonErrors } = require('../middlewares/http/http.json.errors');
const { Post, User, Comment, Sequelize} = require('../models/index');
const {deleteFile} = require('../services/files/handle.files');
/** 
 * Get All Posts 
 */
exports.getAllPosts = async (req, res, next) => {
    const limit = req.query.limit
    try {
        const posts = await Post.findAll({
            attributes: ['id', 'content','media', 'likes', 'mediaType', 
            ['users_liked', 'usersLiked'],['created_at', 'createdAt'],['updated_at', 'updatedAt'],
            [Sequelize.fn('count', Sequelize.col('post_id')), 'commentsCount']
            ],
            include: [
                {model: User, attributes: ['id', 'firstName', 'lastName', 'profilePicture']},
                {model: Comment, attributes: []}
            ],
            group: ['post.id'],
            order: [['created_at', 'DESC']]
        });
        
        return res.http.Ok(posts);
    } catch (error) {
        return jsonErrors(error, res);
    };   
};

/** 
 * Get One Post 
 */
exports.getPostById = async(req, res, next) => {
    try {
        const id = req.params.id
        const post = await Post.findOne({
            where: {id: id},
            attributes: ['id', 'content', 'media', 'likes', 'mediaType', 
            ['users_liked', 'usersLiked'],['created_at', 'createdAt'],['updated_at', 'updatedAt']
            ],
            include: [{
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'profilePicture']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content'],
                    include: [{
                        model: User,
                        attributes: ['id', 'firstName', 'lastName', 'profilePicture']
                    }]
                }
            ],
            order: [ ['created_at', 'DESC']]
        });
        if(!post.id){
            return res.http.NotFound({error: {message: `Post not found`}});
        }
        
        return res.http.Ok(post);
    } catch (error) {
        return jsonErrors(error, res);
    };   
}

/**
 * Create One Post
 */
exports.createPost = async (req, res, next) => {
    try {
        if(req.fileValidationError?.error){
            return res.http.BadRequest({error: {message: req.fileValidationError.message}});
        }
        const payload = {
            content: req.body.content || null,
            media: req.files?.media ||  null
        }
        
        const post = await Post.build({...payload, media: payload.media[0].filename ,user_id: req.user.id});
        await post.validate()
        await post.save();
        return res.http.Created(post)
    } catch (error) {
        return jsonErrors(error, res)
    }
}

/**
 * Update Post
 */
exports.updatePost = async(req, res, next) => {
    
    try {
        if(req.fileValidationError?.error){
            return res.http.BadRequest({error: {message: req.fileValidationError.message}});
        }

        const post = await Post.findOne({where :{id: req.params.id}});
        if(!post){
            return res.http.NotFound({error: {message: `Post not found`}});
        }
        if(post.user_id === req.user.id || req.user.roles.includes('ROLE_ADMIN')){
            await post.set({
                content: req.body.content || null,
                media: req.files?.media ? req.files?.media[0].filename: post.getDataValue('media')
                },{ individualHooks: true})
            
            await post.validate()

            if(post.previous('media') !== post.getDataValue('media')){
            deleteFile(post.previous('media'))
            }
            await post.save()
            return res.http.Ok(post)
        }

        return res.http.Forbidden({error: {message: "permission denied !"}});

    } catch (error) {
        return jsonErrors(error, res)
    }
}

/** 
 * Delete Post  
 */
exports.deletePost = async(req, res, next) => {
    try {
        const id = req.params.id
        const post = await Post.findOne({where: {id: id}});
        if(!post){
            return res.http.NotFound({error: {message: `Post not found !`}});
        }
        
        if(post.user_id === req.user.id || req.user.roles.includes('ROLE_ADMIN')){
            deleteFile(post.getDataValue('media'))
            await post.destroy();
            return res.http.Ok({message: `Post deleted !`});   
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
    try {
        const id = req.params.id
        const post = await Post.findOne({where :{id: id}})
        if(!post){
            return res.http.NotFound({error: { message: 'Post not found'}})
        }
        if(!post.usersLiked.includes(req.user.id)){
            post.usersLiked = [...post.usersLiked, req.user.id]
            post.updateCountLikes()
            
        }else{
            post.usersLiked = post.usersLiked.filter(item => item !== req.user.id)
            post.updateCountLikes()
        }
        await post.save();
        return res.http.Ok({message: "Post liked"});
        
    } catch (error) {
        return jsonErrors(error, res)
    }
    
}