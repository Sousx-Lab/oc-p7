const { jsonErrors } = require('../middlewares/http/http.json.errors');
const { Comment, User } = require('../models/index');
const {deleteFile} = require('../services/files/handle.files');
const commentRespository = require('../repository/comment.respository');
const postRespository = require('../repository/post.repository');

/**
 * 
 * Get comment
 */
exports.getCommentByid = async(req, res, next) =>{
    try {   
        const id = req.params.id;
        const comment = await commentRespository.findOneJoinUser(id)
        if(!comment){
            return res.http.NotFound({error: {message: 'Comment not found'}})
        }
        
        return res.http.Ok(comment);

    } catch (error) {
        return jsonErrors(error, res)
    }
};

/**
 * 
 * Create Comment
 */
exports.createComment = async (req, res, next) =>{
    try {
        if(req.fileValidationError?.error){
            return res.http.UnprocessableEntity({error: {message: req.fileValidationError.message}})
        }
        const post = await postRespository.Post.findOne({where: {id: req.params.id}});
        if(!post){
            return res.http.UnprocessableEntity({error: {message: 'Sorry this post not exist !'}})
        }
        let comment = await commentRespository.Comment.build({
            content: req.body.content || null,
            media: req.files?.media ? req.files?.media[0].filename : null, 
            user_id: req.user.id,
            post_id: req.params.id
        });
        
        await comment.validate()
        await comment.save();

        comment = await commentRespository.findOneJoinUser(comment.id)

        return res.http.Created(comment)
    } catch (error) {
        return jsonErrors(error, res)
    }
}

/**
 * 
 * Update comment
 */
exports.updateComment = async (req, res, next) => {
    try {
        if(req.fileValidationError?.error){
            return res.http.UnprocessableEntity({error: {message: req.fileValidationError.message}})
        }
        let comment = await commentRespository.Comment.findOne({where : {id: req.params.id}})
        if(!comment){
            return res.http.NotFound({error: {message : "Comment not found"}});
        }

        let uploadedFile = req.files?.media ? req.files?.media[0].filename: null;
        if(req.body.media === comment.media && uploadedFile === null){
            uploadedFile = comment.getDataValue('media')
        }
        
        if(comment.user_id === req.user.id || req.user.roles.includes('ROLE_ADMIN')){
            await comment.set({
                content: req.body.content || null,
                media: uploadedFile 
            },{ individualHooks: true});
            
            await comment.validate();
            
            if(comment.previous('media') !== comment.getDataValue('media')){
                deleteFile(comment.previous('media'));
            }
            await comment.save();
            comment = await commentRespository.findOneJoinUser(comment.id)
            return res.http.Ok(comment)
        }
        return res.http.Forbidden({error: {message: 'permission denied'}});
    } catch (error) {
        return jsonErrors(error, res)
    }
   
}

/** 
 * 
 * Delete comment 
 * */
exports.deleteComment = async (req, res, next) => {
    try {
        const id = req.params.id
        const comment = await commentRespository.Comment.findOne({where: {id: id}});
        if(!comment){
            return res.http.NotFound({error: {message: `Comment not found !`}});
        }
        
        if(comment.user_id === req.user.id || req.user.roles.includes('ROLE_ADMIN')){
            deleteFile(comment.getDataValue('media'))
            await comment.destroy();
            return res.http.Ok({message: `Comment deleted !`});   
        }
        
        return res.http.Forbidden({error: {message: 'permission denied'}});
        
    } catch (error) {
        return jsonErrors(error, res);
    };   
}