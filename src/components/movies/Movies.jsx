import { useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import LoadingThreeDotsPulse from "./../ui/LoadingThreeDotsPulse";
import ShortMovie from "../movie/ShortMovie";

export default function Movies({
  data,
  isLoading,
  error,
  isError,
  typeMovies,
}) {
  const movies = Array.isArray(data) ? data : [];
  const ref = useRef(null);
  const responsive = {
    small: {
      breakpoint: { min: 0, max: 639 },
      items: 1,
    },
    sm: {
      breakpoint: { min: 640, max: 767 },
      items: 2,
    },
    md: {
      breakpoint: { min: 768, max: 1023 },
      items: 3,
    },
    lg: {
      breakpoint: { min: 1024, max: 1279 },
      items: 4,
    },
    xl: {
      breakpoint: { min: 1280, max: 1535 },
      items: 5,
    },
    "2xl": {
      breakpoint: { min: 1536 },
      items: 6,
    },
  };

  if (isLoading) {
    return <LoadingThreeDotsPulse />;
  }

  if (isError) {
    return <div>Error fetching movies: {error}</div>;
  }

  if (movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <Carousel
      ref={ref}
      className="pb-10"
      swipeable={true}
      draggable={true}
      showDots={true}
      infinite={true}
      responsive={responsive}
    >
      {movies.map((movie) => (
        <ShortMovie key={movie.id} movie={movie} typeMovies={typeMovies} />
      ))}
    </Carousel>
  );
}
