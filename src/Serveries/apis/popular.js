import axios from "axios";

/**
 * Fetches popular movies from TMDB API
 * Returns movies that are currently trending and popular with audiences
 *
 * @returns {Promise<Array>} Promise that resolves to an array of popular movie objects
 *
 * @example
 * // Usage in a component
 * const popularMovies = await getPopular();
 * // Returns array of currently popular movies
 */
const getPopular = async () => {
  // Make GET request to TMDB popular movies endpoint
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/movie/popular", // TMDB endpoint for popular movies
    {
      headers: {
        // Bearer token for TMDB API authentication
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTMyMTA3MmQ5ZTdkMzdkNGJmYzk0ZTQ0YzFmOTRjYiIsIm5iZiI6MTc2MTg1MTgzNy4zMzc5OTk4LCJzdWIiOiI2OTAzYjliZDBkMWIwYWE3ZjVmYWEwNWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G1V6WXIu-Yzyg-ER5SgduTEvN-ts7yZsm2dJmkXShlY",
        accept: "application/json", // Specify JSON response format
      },
    }
  );

  // Return only the results array containing popular movie objects
  return data.results;
};

export default getPopular;
