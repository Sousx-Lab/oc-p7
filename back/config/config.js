const dotEnv = require('dotenv-flow'); 
dotEnv.config({
  silent: true
});

module.exports = 
{
  dev: {
    use_env_variable:"DATABASE_URL",
    dialect:"mysql",
    charset:"utf8mb4",
    collate:"utf8mb4_unicode_ci",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    use_env_variable:"DATABASE_URL",
    dialect:"mysql",
    charset:"utf8mb4",
    collate:"utf8mb4_unicode_ci",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect:"mysql",
    charset:"utf8mb4",
    collate:"utf8mb4_unicode_ci",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  
  }
}
