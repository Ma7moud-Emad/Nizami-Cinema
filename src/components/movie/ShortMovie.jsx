/* eslint-disable no-unused-vars */
import { hover, motion, scale } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * ShortMovie component - Compact movie card with hover effects and animations
 * Displays movie poster, title, genres, rating, and language
 * Handles navigation to booking page for now-playing movies
 */
export default function ShortMovie({
  movie, // Movie data object from API
  typeMovies, // Flag to enable booking navigation
  classes, // Additional CSS classes for responsive sizing
}) {
  const navigate = useNavigate();

  /**
   * Genre mapping from TMDB genre IDs to human-readable names
   */
  const basicMovieGenres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  // Convert genre IDs to readable genre names
  const movieGenres = movie.genre_ids
    .map((item) => basicMovieGenres[item])
    .join(" ");

  /**
   * Animation variants for the movie card and its elements
   */
  const boxVariants = {
    hidden: {
      opacity: 0,
      scale: 0, // Start scaled down to 0
    },
    visible: (delay = 0) => ({
      opacity: 1,
      scale: 1, // Scale up to normal size
      transition: {
        type: "spring", // Bouncy spring animation
        stiffness: 50, // Spring stiffness
        duration: 0.5,
        delay: delay, // Custom delay for staggered animations
      },
    }),
    hover: {
      scale: 1.1, // Scale up on hover
    },
  };

  /**
   * Handle click navigation - only for now-playing movies
   */
  const handelOnClicked = () => {
    navigate(`/${typeMovies}/${movie.id}`);
  };

  return (
    // Main movie card container
    <motion.div
      variants={boxVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hoverimg" // Apply hover scale effect
      transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
      className={`shadow-2xl cursor-pointer relative text-white rounded-md sm:mr-4 overflow-hidden ${classes}`}
      onClick={handelOnClicked}
    >
      {/* Movie poster image */}
      <motion.img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt="Moive Cover"
        className="object-cover"
        variants={{
          hoverimg: { scale: 1.1 },
        }}
        transition={{ duration: 0.3, type: "tween", ease: "easeInOut" }}
        loading="lazy"
      />

      {/* Gradient overlay for better text readability */}
      <div className="absolute bg-[linear-gradient(0deg,#1d1d1d_18%,transparent_43%)] w-full h-full z-10 top-0 left-0"></div>

      {/* Movie information overlay */}
      <div className="absolute bottom-4 left-4 z-20">
        {/* Movie title with staggered animation */}
        <motion.h2
          variants={boxVariants}
          initial="hidden"
          whileInView="visible"
          custom={0.2} // 0.2s delay for title
          className="font-semibold text-2xl"
        >
          {movie.title}
        </motion.h2>

        {/* Movie details container */}
        <motion.div
          variants={boxVariants}
          initial="hidden"
          whileInView="visible"
          custom={0.4} // 0.4s delay for details
        >
          {/* Movie genres */}
          <p className="text-sm text-gray-300">{movieGenres}</p>

          {/* Release year and rating */}
          <div className="flex items-center gap-2 mb-8 text-gray-300 text-sm">
            <span>{movie.release_date.split("-").splice(0, 1)}</span>
            <span className="flex justify-center items-center gap-0.5">
              <FaStar className=" text-amber-500 " />
              {movie.vote_average}
            </span>
          </div>
        </motion.div>

        {/* Original language badge with special animation */}
        <motion.span
          initial={{ scale: 0, rotate: -180 }} // Start invisible and rotated
          whileInView={{ scale: 1, rotate: 0 }} // Scale up and rotate to normal
          transition={{
            delay: 0.6, // Longest delay for dramatic entrance
            duration: 0.3,
            type: "spring",
            stiffness: 50,
          }}
          className="bg-white/15 text-[14px] py-1 px-2.5 mr-2.5 rounded-sm capitalize block w-fit"
        >
          {movie.original_language}
        </motion.span>
      </div>
    </motion.div>
  );
}
