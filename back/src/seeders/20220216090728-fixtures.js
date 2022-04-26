'use strict';
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const {faker} = require('@faker-js/faker');

async function* asyncGenerator(num){
  let i = 0;
  while(i <= num){
    yield i++;
  }
}

module.exports = {
  async up (queryInterface, Sequelize) {
    let users = [];
    let posts = [];
    let comments = [];
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    for await (let i of asyncGenerator(36)){
      users = [...users, {
        id: crypto.randomUUID(),
        email: `email${i}@domain.com`,
        firstname: faker.name.firstName((i % 2) ? 0 : 1),
        lastname: faker.name.lastName(),
        password: bcrypt.hashSync(`Password${i}`, 10),
        roles: (i === 1) ? JSON.stringify(['ROLE_ADMIN']) : JSON.stringify([]),
        profile_picture: (i > 30) ? null: `img${i}.jpg`,
        bio: faker.lorem.sentence(faker.datatype.number({min: 5, max: 10})),
        is_active: true,
        created_at: date,
        updated_at: date,
      }];
      posts = [...posts, {
        id: crypto.randomUUID(),
        content: faker.lorem.paragraph(faker.datatype.number({min:1, max:4})),
        media: (i > 5) ? `postimage.jpg` : `postvideo.mp4`,
        users_liked: (i > 10) ? 
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
        media: (i % 2) ? `postimage.jpg` : `postvideo.mp4`,
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
