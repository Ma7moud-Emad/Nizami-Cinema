import useFetch from "../../Hooks/useFetch";
import Movies from "./Movies";
import SectionList from "./SectionList";
import getMovies from "../../Serveries/apis";

/**
 * TopRating component that displays top-rated movies
 * Fetches data from the top_rating API endpoint and renders a movie carousel
 */
export default function TopRating() {
  // Custom hook to fetch top-rated movies data
  // Parameters:
  // - "top_rating": Query key for caching and devtools
  // - getMovies: API function that fetches top-rated movies
  const { data, isPending, error } = useFetch("top_rating", () =>
    getMovies("top_rated", 1)
  );

  return (
    /**
     * SectionList wrapper component that provides:
     * - Consistent section layout and styling
     * - Section title display
     * - "View All" navigation link
     */
    <SectionList
      title="Top Rating" // Section header text
      path="/toprating" // Route path for "View All" navigation
    >
      {/* 
        Movies component that renders the responsive carousel
        Props passed down:
        - data: Array of top-rated movie objects from API
        - isLoading: Boolean indicating if data is still being fetched
        - error: Error object if the API request failed
      */}
      <Movies
        data={data}
        isLoading={isPending}
        error={error}
        typeMovies="toprating"
      />
    </SectionList>
  );
}
