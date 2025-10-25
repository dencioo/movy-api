import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import authRoutes from './modules/auth/routes.js';
import movieRoutes from './modules/movies/routes.js';
import watchlistRoutes from './modules/watchlist/routes.js';
import { authenticate } from './modules/middleware/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/movyapi'

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

try {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Unable to connect to database", error);
}

app.get("/api/health", async (req, res) => {
  res.status(200).json({ message: "API is healthy 🚀" });
});

app.get("/api/protected", authenticate, (req, res) => {
  res.json({
    message: "You have accessed a protected route",
    user: req.user,
  })
})
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/watchlists', watchlistRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
