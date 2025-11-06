import axios from "axios";

/**
 * Fetches detailed information for a specific movie from TMDB API
 *
 * @param {string|number} movie_id - The unique identifier for the movie in TMDB database
 * @returns {Promise<Object>} Promise that resolves to the complete movie data object
 *
 * @example
 * // Usage in a component
 * const movieDetails = await getMovieDetails(550); // Gets details for Fight Club
 */
const getMovieDetails = async (movie_id) => {
  // Make GET request to TMDB movie details endpoint
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}`, // TMDB API endpoint for specific movie
    {
      headers: {
        // Bearer token for TMDB API authentication
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTMyMTA3MmQ5ZTdkMzdkNGJmYzk0ZTQ0YzFmOTRjYiIsIm5iZiI6MTc2MTg1MTgzNy4zMzc5OTk4LCJzdWIiOiI2OTAzYjliZDBkMWIwYWE3ZjVmYWEwNWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G1V6WXIu-Yzyg-ER5SgduTEvN-ts7yZsm2dJmkXShlY",
        accept: "application/json", // Specify JSON response format
      },
    }
  );

  return data; // Return the complete movie data object
};

export default getMovieDetails;
