import axios from "axios";

/**
 * Fetches currently playing movies from TMDB API
 * Returns movies that are currently showing in theaters
 *
 * @returns {Promise<Array>} Promise that resolves to an array of movie objects
 *
 * @example
 * // Usage in a component
 * const nowPlayingMovies = await getNowPlaying();
 * // Returns array of movies currently in theaters
 */
const getNowPlaying = async (page) => {
  // Make GET request to TMDB now_playing endpoint
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?page=${page}`, // TMDB endpoint for currently playing movies
    {
      headers: {
        // Bearer token for TMDB API authentication
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTMyMTA3MmQ5ZTdkMzdkNGJmYzk0ZTQ0YzFmOTRjYiIsIm5iZiI6MTc2MTg1MTgzNy4zMzc5OTk4LCJzdWIiOiI2OTAzYjliZDBkMWIwYWE3ZjVmYWEwNWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G1V6WXIu-Yzyg-ER5SgduTEvN-ts7yZsm2dJmkXShlY",
        accept: "application/json", // Specify JSON response format
      },
    }
  );

  // Return only the results array containing movie objects
  return data.results;
};

export default getNowPlaying;
