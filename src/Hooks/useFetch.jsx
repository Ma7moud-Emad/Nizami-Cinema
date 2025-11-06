import { useQuery } from "@tanstack/react-query";

/**
 * Custom React Query hook for data fetching with standardized configuration
 * Provides a simplified interface over useQuery with common defaults
 *
 * @param {string} queryKey - Unique identifier for the query (used for caching)
 * @param {Function} queryFn - Async function that returns the data
 * @returns {Object} Query result containing data, loading state, and error information
 */
function useFetch(queryKey, queryFn) {
  // Use React Query's useQuery hook with provided parameters
  const { data, isPending, error, isError } = useQuery({
    queryKey: [queryKey], // Wrap in array per React Query convention
    queryFn: queryFn, // Function that returns a Promise with the data
  });

  // Return the query state in a consistent format
  return { data, isPending, error, isError };
}

export default useFetch;
