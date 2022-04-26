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

/**
 * 
 * @param {number} page 
 * @param {number} perPage 
 * @returns 
 */
exports.findAllJoinUser = async (page = 1, perPage = 10) =>{
    return await Post.findAndCountAll({
        offset: (page* perPage) - perPage,
        limit: perPage,
        attributes: ['id', 'content','media', 'likes', 'mediaType',
        ['users_liked', 'usersLiked'],['created_at', 'createdAt'],['updated_at', 'updatedAt'],
        [Sequelize.literal("(SELECT COUNT(*) FROM comments where post_id = post.id)"), "commentsCount"],
        ],
        include: [{
            model: User, 
            attributes: ['id', 'firstName', 'lastName', 'profilePicture', 'bio', 'roles',
            ['created_at', 'createdAt'],['updated_at', 'updatedAt']]
            },
            {model: Comment, attributes: []}
        ],
        group: ['post.id'],
        order: [['created_at', 'DESC']],
        separate:true
    });
}

exports.findOneJoinUser = async (id) =>{
    return await Post.findOne({
        where: {id: id},
        attributes: ['id', 'content', 'media', 'likes', 'mediaType',
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