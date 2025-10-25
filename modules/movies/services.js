import axios from 'axios';

export async function fetchPopularMovies() {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TMDB API request failed: ${response.status}`)
    }
    const data = await response.json();
    return data.results; 
  } catch (error) {
    console.error("Error fetching TMDB movies:", error);
    return [];
  }
}