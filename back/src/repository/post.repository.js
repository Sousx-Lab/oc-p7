const {Post, User, Comment, Sequelize} = require('../models/index');


exports.findOneJoinUserComment = async (id) =>{
    return await Post.findOne({
        where: {id: id},
        attributes: ['id', 'content', 'media', 'likes', 'mediaType', 
        ['users_liked', 'usersLiked'],['created_at', 'createdAt'],['updated_at', 'updatedAt']],
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
        order: [['created_at', 'DESC']]
    });
}

exports.findAllJoinUser = async () =>{
    return await Post.findAll({
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
}

exports.Post = Post