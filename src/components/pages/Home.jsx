import NowPlaying from "./../movies/NowPlaying";
import Upcoming from "./../movies/Upcoming";
import TopRating from "./../movies/TopRating";

/**
 * Home component - Main page that displays multiple movie sections
 * Serves as the landing page/dashboard for the movie application
 */
export default function Home() {
  return (
    // Main container for the home page content
    <div>
      {/* 
        Now Playing section - displays currently playing movies in theaters
        This is typically the most relevant section for users
      */}
      <NowPlaying />

      {/* 
        Upcoming section - displays movies that will be released soon
        Helps users discover future releases to watch out for
      */}
      <Upcoming />

      {/* 
        Top Rating section - displays highest rated movies
        Shows critically acclaimed films for quality-focused viewers
      */}
      <TopRating />
    </div>
  );
}
