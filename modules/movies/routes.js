import { Router } from 'express';
import { getMovie, getMovies, syncMovies, syncSingleMovie } from './controller.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/sync', authenticate, syncMovies);
router.post('/', authenticate, syncSingleMovie);
router.get('/', getMovies);
router.get('/:id', getMovie);

export default router;