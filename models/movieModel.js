import { model, Schema } from 'mongoose';

const movieSchema = new Schema({
    tmdbId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
    },
    overview: {
      type: String,
    },
    posterPath: {
      type: String,
    },
    voteAverage: {
      type: Number
    }
  }, { timestamps: true })

export const Movie = model('Movie', movieSchema)