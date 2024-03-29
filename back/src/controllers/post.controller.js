const { jsonErrors } = require('../middlewares/http/http.json.errors');
const {deleteFile} = require('../services/files/handle.files');
const postRespository = require('../repository/post.repository');
/** 
 * Get All Posts 
 */
exports.getAllPosts = async (req, res, next) => {
    let perPage = parseInt(req.query?.perPage) || 10;
    perPage = perPage > 10 ? 10 : perPage;
    
    const page = parseInt(req.query?.page) || 1;
    try {
        const {count, rows: posts } = await postRespository.findAllJoinUser(page, perPage);
        return res.http.Ok({total: count.length, posts});
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
        const post = await postRespository.findOneJoinUserComment(id)
        
        if(!post){
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
            return res.http.UnprocessableEntity({error: {message: req.fileValidationError.message}});
        }
        
        let post = await postRespository.Post.build({
            content: req.body.content || null, 
            media: req.files?.media ? req.files.media[0].filename : null, 
            user_id: req.user.id
        });
        
        await post.validate()
        await post.save();
        post = await postRespository.findOneJoinUser(post.id)

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
            return res.http.UnprocessableEntity({error: {message: req.fileValidationError.message}});
        }

        let post = await postRespository.Post.findOne({where :{id: req.params.id}});
        if(!post){
            return res.http.NotFound({error: {message: `Post not found`}});
        }
        
        let uploadedFile = req.files?.media ? req.files?.media[0].filename: null;
        if(req.body.media === post.getDataValue('media') && uploadedFile === null){
            uploadedFile = post.getDataValue('media')
        }
        if(req.user.roles.includes('ROLE_ADMIN')){
            await post.set({
                content: req.body.content || null,
                media: uploadedFile
                },{ individualHooks: true})
            
            await post.validate()

            if(post.previous('media') !== post.getDataValue('media')){
            deleteFile(post.previous('media'))
            }
            await post.save()
            post = await postRespository.findOneJoinUserComment(post.id)
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
        const post = await postRespository.Post.findOne({where: {id: id}});
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
        const post = await postRespository.Post.findOne({where :{id: id}})
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