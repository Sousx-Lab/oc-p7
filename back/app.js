const dotEnv = require('dotenv-flow');
dotEnv.config({
  silent: true
});
const express = require('express');
const userRoutes = require('./src/routes/user.routes');

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());


/**Auth Api */
app.use('/api/auth', userRoutes);

module.exports = app;