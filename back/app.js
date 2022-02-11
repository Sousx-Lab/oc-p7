require('dotenv-flow').config({silent: true});
const express = require('express');
const cookieParser = require('cookie-parser');
const httpResponse = require('./src/middlewares/http/http.response');
const handleParserError = require('./src/middlewares/validator/body.parser')
const userRoutes = require('./src/routes/user.routes');
const postsRoutes = require('./src/routes/posts.routes');

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(httpResponse())

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())

app.use(handleParserError());

app.use(cookieParser(process.env.COOKIE_SIGNATURE));

/**Auth Route */
app.use('/api/auth', userRoutes);


/** Posts Route */
app.use('/api/posts', postsRoutes);

module.exports = app;