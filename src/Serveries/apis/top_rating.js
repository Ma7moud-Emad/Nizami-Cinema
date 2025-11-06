import axios from "axios";

/**
 * Fetches top-rated movies from TMDB API
 * Returns movies with the highest user ratings (vote averages)
 *
 * @returns {Promise<Array>} Promise that resolves to an array of top-rated movie objects
 *
 * @example
 * // Usage in a component
 * const topRatedMovies = await getTopRating();
 * // Returns array of highest rated movies
 */
const getTopRating = async (page) => {
  // Make GET request to TMDB top_rated movies endpoint
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?page=${page}`, // TMDB endpoint for top-rated movies
    {
      headers: {
        // Bearer token for TMDB API authentication
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTMyMTA3MmQ5ZTdkMzdkNGJmYzk0ZTQ0YzFmOTRjYiIsIm5iZiI6MTc2MTg1MTgzNy4zMzc5OTk4LCJzdWIiOiI2OTAzYjliZDBkMWIwYWE3ZjVmYWEwNWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G1V6WXIu-Yzyg-ER5SgduTEvN-ts7yZsm2dJmkXShlY",
        accept: "application/json", // Specify JSON response format
      },
    }
  );

  // Return only the results array containing top-rated movie objects
  return data.results;
};

export default getTopRating;
