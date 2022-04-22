const {Comment, User} = require('../models/index');

exports.findOneJoinUser = async (id) => {
    
    return await Comment.findOne({
        where : {id: id},
        attributes: ['id', 'content', 'media', 'mediaType',
        ['created_at', 'createdAt'],['updated_at', 'updatedAt']
        ],
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'profilePicture', 'bio', 'roles',
            ['created_at', 'createdAt'],['updated_at', 'updatedAt']]
        }],
    })
};

exports.Comment = Comment