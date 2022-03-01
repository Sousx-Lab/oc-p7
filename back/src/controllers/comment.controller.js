const { jsonErrors } = require('../middlewares/http/http.json.errors');
const { Comment, User } = require('../models/index');
const {deleteFile} = require('../services/files/handle.files');
/**
 * 
 * Get comment
 */
exports.getCommentByid = async(req, res, next) =>{
    try {   
        const id = req.params.id;
        const comment = await Comment.findOne({
            where : {id: id},
            attributes: ['id', 'content', 'media', 'created_at','updated_at', 'mediaType'],
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'profilePicture']
            }],
        })
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
            return res.http.BadRequest({error: {message: req.fileValidationError.message}})
        }
        let comment = await Comment.build({
            content: req.body.content || null,
            media: req.files?.media ? req.files?.media[0].filename :null, 
            user_id: req.user.id,
            post_id: req.params.id
        });
        
        await comment.validate()
        await comment.save();
        comment = await Comment.findOne({
            where : {id: comment.id},
            attributes: ['id', 'content', 'media', 'created_at','updated_at', 'mediaType'],
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'profilePicture']
            }],
        });

        return res.http.Created({comment})
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
        const comment = await Comment.findOne({where : {id: req.params.id}})
        if(!comment){
            return res.http.NotFound({error: {message : "Comment not found"}});
        }
        await comment.set({
            comment: req.body.content ?? comment.getDateValue('content'),
            media: req.files?.media ? req.files?.media[0].filename: comment.getDateValue('media') 
        },{ individualHooks: true});
        
        await comment.validate();
        if(comment.previous('media') !== comment.getDataValue('media')){
            deleteFile(comment.previous('media'));
        }
        await comment.save();
        return res.http.Ok(comment)
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
        const comment = await Comment.findOne({where: {id: id}});
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