import { Router } from 'express';
import { signup, login } from '../controllers/user.controller';

const router = Router();

/** Authentification Routes */
router.post('/signup', signup);
router.post('/login', login);

export default router;