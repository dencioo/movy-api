import { Movie } from '../../models/movieModel.js';
import { fetchPopularMovies } from './services.js';

export async function getMovies(req, res) {
  const movies = await  Movie.find({});

  return res.status(200).json({ movies })
}

export async function getMovie(req, res) {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Invalid movie ID"
    })
  }

  const movie = await Movie.findOne({ 
    tmdbId: Number(id)
  });

  if (!movie) {
    return res.status(404).json(
      { error: "Sorry, can't find that movie"}
    )
  }

  return res.json({ movie });
}

export async function syncMovies(req, res) {
  
  const moviesFromTMDB = await fetchPopularMovies();

  const operations = moviesFromTMDB.map(async (movie) => {
    return Movie.updateOne(
      {tmdbId: movie.id},
      {
        tmdbId: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        overview: movie.overview,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average
      },
      {upsert: true}
    )
  })

  await Promise.all(operations);

  return res.json({
    message: `${moviesFromTMDB.length} movies synced succesfully!`
  })
}

export async function syncSingleMovie(req, res) {
  try {
    const {tmdbId, title, releaseDate, overview, posterPath, voteAverage} = req.body;

    if (!tmdbId || !title) {
      return res.status(400).json({
        error: "tmbdId and title are required"
      });
    }

    const movie = await Movie.findOneAndUpdate(
      { tmdbId },
      {
        tmdbId,
        title,
        releaseDate,
        overview,
        posterPath,
        voteAverage
      },
      { upsert: true, new: true}
    );

    return res.status(200).json({
      message: "The movie synced succesfully",
      movie
    });
  } catch (error) {
    console.error('Error syncing single movie', error);
    return res.status(500).json({
      error: "Failed to sync movie"
    })
  }
} 