import useFetch from "../../Hooks/useFetch";
import Movies from "./Movies";
import SectionList from "./SectionList";
import getMovies from "../../Serveries/apis";

/**
 * Upcoming component that displays upcoming movies
 * Fetches data from the upcoming API endpoint and renders a movie carousel
 */
export default function Upcoming() {
  // Custom hook to fetch upcoming movies data
  // NOTE: There's a bug here - the query key should be "upcoming" instead of "top_rating"
  // This might cause caching issues where upcoming movies are stored under the wrong key
  const { data, isPending, error } = useFetch("upComing", () =>
    getMovies("upcoming", 1)
  );

  return (
    /**
     * SectionList wrapper component that provides:
     * - Consistent section layout and styling
     * - Section title display
     * - "View All" navigation link
     */
    <SectionList
      title="Upcoming" // Section header text for upcoming movies
      path="/upcoming" // Route path for "View All" navigation
    >
      {/* 
        Movies component that renders the responsive carousel
        Props passed down:
        - data: Array of upcoming movie objects from API
        - isLoading: Boolean indicating if data is still being fetched  
        - error: Error object if the API request failed
      */}
      <Movies
        data={data}
        isLoading={isPending}
        error={error}
        typeMovies="upcoming"
      />
    </SectionList>
  );
}
