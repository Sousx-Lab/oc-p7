const dotEnv = require('dotenv-flow')
dotEnv.config({silent: true});
const express = require('express');
const cookieParser = require('cookie-parser');
const httpResponse = require('./src/middlewares/http/http.response');
const handleParserError = require('./src/middlewares/validator/body.parser')
const userRoutes = require('./src/routes/users.routes');
const postsRoutes = require('./src/routes/posts.routes');
const commenstRoutes = require('./src/routes/comments.routes');
const swaggerRoutes = require('./src/routes/swagger.routes');
const path = require('path');
const app = express();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',  req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, x-xsrf-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(httpResponse())

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())

app.use(handleParserError());

app.use(cookieParser(process.env.COOKIE_SIGNATURE));

app.use((req, res, next) => {
  global.apiHost = `${req.protocol}://${req.get('host')}`
  global.mediaHost = apiHost + `${process.env.MEDIA_FOLDER}`
  next();
});

/** Medias */
app.use('/media', express.static(path.join(__dirname, 'src/media')));
/***********/

/** User Routes */
app.use('/api/user', userRoutes);
/*************/

/** Posts Routes */
app.use('/api/posts', postsRoutes);
/***************/

/** Comments Routes */
app.use('/api/comments', commenstRoutes);

/** Swagger Routes */
app.use('/api', swaggerRoutes);
/*****************/
module.exports = app;