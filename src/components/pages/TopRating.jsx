import { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import LoadingThreeDotsPulse from "../ui/LoadingThreeDotsPulse";
import ShortMovie from "../movie/ShortMovie";
import SectionList from "../movies/SectionList";
import Pagination from "../ui/Pagination";
import getMovies from "../../Serveries/apis";

/**
 * TopRatingPage component - Full page view of all top-rated movies
 * Displays movies in a responsive grid layout instead of carousel
 */
export default function TopRatingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;
  // Fetch top-rated movies data using custom hook
  const { data, isPending, error } = useFetch(["top_rating", currentPage], () =>
    getMovies("top_rated", currentPage)
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
     * BUG: Title says "Now Playing" but should be "Top Rating" for this page
     * No path prop provided since this IS the full page (no "View All" needed)
     */
    <SectionList title="Top Rating">
      {/* 
        Responsive grid container for movie cards
        Uses flexbox with wrap and responsive width classes
      */}
      <div className="flex flex-wrap justify-center">
        {/* 
          Map through top-rated movie data and render each as a ShortMovie component
          Uses grid layout instead of carousel for full page view
        */}
        {data.map((movie) => {
          return (
            <ShortMovie
              key={movie.id} // Unique identifier for React rendering
              movie={movie} // Individual movie data object
              typeMovies="toprating" // Flag set to false since these are top-rated, not now-playing
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
