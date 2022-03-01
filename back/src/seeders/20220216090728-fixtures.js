'use strict';
const crypto = require('crypto');
const bcrypt = require('bcrypt');


async function* asyncGenerator(){
  let i = 0;
  while(i < 10){
    yield i++;
  }
}

module.exports = {
  async up (queryInterface, Sequelize) {
    let users = [];
    let posts = [];
    let comments = [];
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    for await (let i of asyncGenerator()){
      users = [...users, {
        id: crypto.randomUUID(),
        email: `email${i}@domain.com`,
        firstname: `John${i}`,
        lastname: `Doe${i}`,
        password: bcrypt.hashSync(`Password${i}`, 10),
        roles: (i === 1) ? JSON.stringify(['ROLE_ADMIN']) : JSON.stringify([]),
        profile_picture: `image${i}.jpeg`,
        is_active: true,
        created_at: date,
        updated_at: date,
      }];
      posts = [...posts, {
        id: crypto.randomUUID(),
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla eget lacus fringilla dapibus.",
        media: (i > 5) ? `image${i}.jpg` : `video${i}.mp4`,
        users_liked: (i > 5) ? 
          JSON.stringify([`${users[i].id}`,`${users[i-1].id}`,`${users[i-2].id}`])
          : JSON.stringify([`${users[i].id}`]),
        created_at: date,
        updated_at: date,
        user_id: users[i].id,
      }];
      posts[i].likes = JSON.parse(posts[i].users_liked).length.toString();
      comments = [...comments, {
        id: crypto.randomUUID(),
        content: `Commentary post, consectetur adipiscing elit. Donec fringilla ${i}`,
        media: `image${i}.jpg`,
        created_at: date,
        updated_at: date,
        user_id: users[i].id,
        post_id: posts[i].id
      }]
    }
    
    await queryInterface.bulkInsert('users', users, {});
    await queryInterface.bulkInsert('posts', posts, {})
    await queryInterface.bulkInsert('comments', comments, {})
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
