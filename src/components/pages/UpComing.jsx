import { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import LoadingThreeDotsPulse from "../ui/LoadingThreeDotsPulse";
import ShortMovie from "../movie/ShortMovie";
import SectionList from "../movies/SectionList";
import Pagination from "../ui/Pagination";
import getMovies from "../../Serveries/apis";

/**
 * UpcomingPage component - Full page view of all upcoming movies
 * Displays movies in a responsive grid layout instead of carousel
 */
export default function UpcomingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;
  // Fetch upcoming movies data using custom hook
  // Note: Fixed query key from "top_rating" to "upcoming" for proper caching
  const { data, isPending, error } = useFetch(["upcoming", currentPage], () =>
    getMovies("upcoming", currentPage)
  );

  // Display loading indicator while data is being fetched
  if (isPending) {
    return <LoadingThreeDotsPulse />;
  }

  // Display error message if data fetch failed
  if (error) {
    return <div>error</div>;
  }

  return (
    /**
     * SectionList wrapper for consistent page section styling
     * BUG: Title says "Now Playing" but should be "Upcoming" for this page
     * No path prop provided since this IS the full page (no "View All" needed)
     */
    <SectionList title="Upcoming">
      {/* 
        Responsive grid container for movie cards
        Uses flexbox with wrap and responsive width classes
      */}
      <div className="flex flex-wrap justify-center">
        {/* 
          Map through upcoming movie data and render each as a ShortMovie component
          Uses grid layout instead of carousel for full page view
        */}
        {data.map((movie) => {
          return (
            <ShortMovie
              key={movie.id} // Unique identifier for React rendering
              movie={movie} // Individual movie data object
              typeMovies="upcoming" // Flag set to false since these are upcoming, not now-playing
              classes="mb-4 sm:w-[47%] md:w-[31%] lg:w-[23%] xl:w-[18%]" // Responsive width classes:
              // - mb-4: Bottom margin for spacing between rows
              // - sm:w-[47%]: ~2 columns on small screens (640px+)
              // - md:w-[31%]: ~3 columns on medium screens (768px+)
              // - lg:w-[23%]: ~4 columns on large screens (1024px+)
              // - xl:w-[18%]: ~5 columns on extra large screens (1280px+)
            />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </SectionList>
  );
}
