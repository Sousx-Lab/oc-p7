'use strict';
const crypto = require('crypto');
const bcrypt = require('bcrypt');


async function* asyncGenerator(){
  let i = 0;
  while(i < 8){
    yield i++;
  }
}

module.exports = {
  async up (queryInterface, Sequelize) {
    let users = [];
    let posts = [];
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    for await (let i of asyncGenerator()){
      users = [...users, {
        id: crypto.randomUUID(),
        email: `email${i}@domain.com`,
        firstname: `John${i}`,
        lastname: `Doe${i}`,
        password: bcrypt.hashSync(`Password${i}`, 10),
        roles: (i === 1) ? JSON.stringify(['ROLE_ADMIN']) : JSON.stringify([]),
        created_at: date,
        updated_at: date,
      }]
      posts = [...posts, {
        id: crypto.randomUUID(),
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla eget lacus fringilla dapibus.",
        published_at: date,
        created_at: date,
        updated_at: date,
        user_id: users[i].id,
      }]
    }
    await queryInterface.bulkInsert('users', users, {});
    await queryInterface.bulkInsert('posts', posts, {})
    
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
