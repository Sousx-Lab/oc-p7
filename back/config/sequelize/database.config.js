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
    timestamps: true,
    logging: false,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
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
    underscored: true,
    timestamps: true,
    logging: false,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
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
    underscored: true,
    timestamps: true,
    logging: false,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  
  }
}
