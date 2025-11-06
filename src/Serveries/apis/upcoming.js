import axios from "axios";

/**
 * Fetches upcoming movies from TMDB API
 * Returns movies that are scheduled for release in the near future
 *
 * @returns {Promise<Array>} Promise that resolves to an array of upcoming movie objects
 *
 * @example
 * // Usage in a component
 * const upcomingMovies = await getUpComing();
 * // Returns array of movies coming soon to theaters
 */
const getUpComing = async (page) => {
  // Make GET request to TMDB upcoming movies endpoint
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?page=${page}`, // TMDB endpoint for upcoming movies
    {
      headers: {
        // Bearer token for TMDB API authentication
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTMyMTA3MmQ5ZTdkMzdkNGJmYzk0ZTQ0YzFmOTRjYiIsIm5iZiI6MTc2MTg1MTgzNy4zMzc5OTk4LCJzdWIiOiI2OTAzYjliZDBkMWIwYWE3ZjVmYWEwNWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G1V6WXIu-Yzyg-ER5SgduTEvN-ts7yZsm2dJmkXShlY",
        accept: "application/json", // Specify JSON response format
      },
    }
  );

  // Return only the results array containing upcoming movie objects
  return data.results;
};

export default getUpComing;
