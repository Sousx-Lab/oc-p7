import dotEnv from 'dotenv-flow';
import express, { urlencoded, json } from 'express';
import userRoutes from './routes/user.routes';

dotEnv.config();
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(urlencoded({
  extended: true
}));
app.use(json());

/**Auth Api */
app.use('/api/auth', userRoutes);

export default app;