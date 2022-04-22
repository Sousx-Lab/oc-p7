const {Post, User, Comment, Sequelize} = require('../models/index');


exports.findOneJoinUserComment = async (id) =>{
    return await Post.findOne({
        where: {id: id},
        attributes: ['id', 'content', 'media', 'likes', 'mediaType',
        ['users_liked', 'usersLiked'],['created_at', 'createdAt'],['updated_at', 'updatedAt']],
        include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'profilePicture', 'bio', 'roles',
                ['created_at', 'createdAt'],['updated_at', 'updatedAt']]
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'media', 'mediaType', ['created_at', 'createdAt'],['updated_at', 'updatedAt']],
                include: [{
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'profilePicture', 'bio', 'roles',
                    ['created_at', 'createdAt'],['updated_at', 'updatedAt']]
                }],
            },
        ],
        order: [['Comments', 'created_at', 'DESC']],
    });
}

exports.findAllJoinUser = async () =>{
    return await Post.findAll({
        attributes: ['id', 'content','media', 'likes', 'mediaType',
        ['users_liked', 'usersLiked'],['created_at', 'createdAt'],['updated_at', 'updatedAt'],
        [Sequelize.fn('count', Sequelize.col('post_id')), 'commentsCount']
        ],
        include: [{
            model: User, 
            attributes: ['id', 'firstName', 'lastName', 'profilePicture', 'bio', 'roles',
                ['created_at', 'createdAt'],['updated_at', 'updatedAt']]
            },
            {model: Comment, attributes: []}
        ],
        group: ['post.id'],
        order: [['created_at', 'DESC']]
    });
}

exports.findOneJoinUser = async (id) =>{
    return await Post.findOne({
        where: {id: id},
        attributes: ['id', 'content', 'media', 'likes', 'mediaType',,
        ['users_liked', 'usersLiked'],['created_at', 'createdAt'],['updated_at', 'updatedAt'],
        [Sequelize.fn('count', Sequelize.col('post_id')), 'commentsCount']
        ],
        include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'profilePicture', 'bio', 'roles',
                ['created_at', 'createdAt'],['updated_at', 'updatedAt']]
            },
            {model: Comment, attributes: []}
        ],
        group: ['post.id'],
        order: [['created_at', 'DESC']]
    });
}

exports.Post = Post