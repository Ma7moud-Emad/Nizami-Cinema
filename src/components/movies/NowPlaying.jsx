import useFetch from "../../Hooks/useFetch";
import getMovies from "../../Serveries/apis";
import Movies from "../movies/Movies";
import SectionList from "./SectionList";

/**
 * NowPlaying component that displays currently playing movies
 * Fetches data from the now_playing API endpoint and renders a movie carousel
 */
export default function NowPlaying() {
  // Custom hook to fetch now playing movies data
  // Parameters: query key and API function
  const { data, isPending, error } = useFetch("now_playing", () =>
    getMovies("now_playing", 1)
  );

  return (
    /**
     * SectionList wrapper component that provides:
     * - Section title
     * - Navigation path
     * - Consistent section styling
     */
    <SectionList
      title="Now Playing" // Section header text
      path="/nowplaying" // Route path for "View All" navigation
    >
      {/* 
        Movies component that renders the carousel
        Props passed down:
        - data: Fetched movie data array
        - isLoading: Loading state from useFetch hook
        - error: Error object if fetch failed  
        - isNowPlayingMovie: Flag to indicate these are now-playing movies
      */}
      <Movies
        data={data}
        isLoading={isPending}
        error={error}
        typeMovies="nowplaying"
      />
    </SectionList>
  );
}
