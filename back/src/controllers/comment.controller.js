const { jsonErrors } = require('../middlewares/http/http.json.errors');
const { Comment, User } = require('../models/index');

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
        comment.addUrl(req.mediaUrl)
        return res.http.Ok(comment);

    } catch (error) {
        return jsonErrors(error, res)
    }
    
};

exports.createComment = async (req, res, next) =>{
    if(req.fileValidationError?.error){
        return res.http.BadRequest({error: {message: req.fileValidationError.message}})
    }
    try {
        
        const payload = {
            content: req.body.content || null,
            media: req.file?.filename ||  null,
            post_id: req.params.id
        }
        const comment = await Comment.build({...payload, user_id: req.user.id});
        await comment.validate()
        await comment.save();
        comment.addUrl(req.mediaUrl);
        const user = User.findOne({where: {id: comment.user_id}})
        return res.http.Created(comment)
    } catch (error) {
        return jsonErrors(error, res)
    }
}

exports.updateComment = async (req, res, next) => {
    return res.http.Ok('ok')
}

exports.deleteComment = async (req, res, next) => {
    try {
        const id = req.params.id
        const comment = await Comment.findOne({where: {id: id}});
        if(!comment){
            return res.http.NotFound({error: {message: `Comment not found !`}});
        }
        
        if(comment.user_id === req.user.id || req.user.roles.includes('ROLE_ADMIN')){
            deleteFile(comment.media)
            await comment.destroy();
            return res.http.Ok({message: `Comment deleted !`});   
        }
        
        return res.http.Forbidden({error: {message: 'permission denied'}});
        
    } catch (error) {
        return jsonErrors(error, res);
    };   
}