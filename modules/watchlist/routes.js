import { Router } from 'express';
import { addMovieToWatchlist, createWatchlist, deleteWatchlist, getUserWatchlists, getWatchlistById, removeMovieToWatchlist, renameWatchlist } from './controller.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = new Router();

// Create & get watchlist
router.post('/', authenticate, createWatchlist);
router.get('/', authenticate, getUserWatchlists)
router.get('/:id', authenticate, getWatchlistById);
router.put('/:id', authenticate, renameWatchlist);
router.delete('/:id', authenticate, deleteWatchlist);

// Manage movie in the watchlist
router.post('/:id/movies', authenticate, addMovieToWatchlist);
router.delete('/:id/movies/:movieId', authenticate, removeMovieToWatchlist);

export default router;
