import { Router } from 'express';
import { loginUser, logoutUser, registerUser } from './controller.js';

const router = new Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
export default router;