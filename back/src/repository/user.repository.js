const {Post, User, Comment, Sequelize} = require('../models/index');

exports.findOneJoinPostsComment = async(id) =>{
    
    return await User.findOne({
        where : {id:  id},
        attributes: ['firstName', 'lastName', 'profilePicture', 'bio',
        ['created_at', 'createdAt'],['updated_at', 'updatedAt']
        ],
        include: [
            {
            model: Post,
            attributes: ['id', 'content', "media", 'likes', 
            ['users_liked', 'usersLiked'],['created_at', 'createdAt'],['updated_at', 'updatedAt'],
            [Sequelize.fn('count', Sequelize.col('post_id')), 'commentsCount'], 
            ],
            include: {model: Comment,attributes: []} 
            }
        ],
        group:['post_id']
    });
};

exports.User = User;