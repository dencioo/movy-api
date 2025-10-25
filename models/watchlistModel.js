import { model, Schema, Types } from 'mongoose';

const watchlistSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  movies: [{
    type: Types.ObjectId,
    ref: 'Movie',
  }]
}, {timestamps: true})


export const Watchlist = model('Watchlist', watchlistSchema);