const {Post, User, Comment, Sequelize} = require('../models/index');

exports.findOneJoinPostsComment = async(id) =>{
    
    return await User.findOne({
        where : {id:  id},
        attributes: ['id', 'firstName', 'lastName', 'profilePicture', 'bio',
        ['created_at', 'createdAt'],['updated_at', 'updatedAt']
        ],
        include: [
            {
            model: Post,
            order: [['created_at', 'DESC']],
            attributes: ['id', 'content', 'media', 'mediaType', 'likes', 
            ['users_liked', 'usersLiked'],['created_at', 'createdAt'],['updated_at', 'updatedAt'],
            [Sequelize.fn('count', Sequelize.col('post_id')), 'commentsCount'], 
            ],
            include: {model: Comment,attributes: []} 
            }
        ],
        order: [['Posts', 'created_at', 'DESC']],
        group:['post_id'],
    });

};

exports.User = User;