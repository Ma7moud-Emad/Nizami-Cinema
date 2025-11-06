import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./components/pages/Home";
import BookTicket from "./components/bookTickets/BookTicket";
import NowPlayingPage from "./components/pages/NowPlaying";
import TopRatingPage from "./components/pages/TopRating";
import UpcomingPage from "./components/pages/UpComing";
import MovieOverview from "./components/movie/MovieOverview";

/**
 * Main App component that defines the application routing structure
 * Sets up all routes and their corresponding components
 */
export default function App() {
  return (
    // Routes component wraps all individual route definitions
    <Routes>
      {/* 
        Layout route - provides shared layout (header, footer, etc.)
        for all nested child routes
      */}
      <Route path="/" element={<Layout />}>
        {/* 
          Index route - renders when path exactly matches "/"
          This is the home page/dashboard
        */}
        <Route index element={<Home />} />

        {/* 
          Movie category pages - full page views of each category
          These routes are nested within the Layout for consistent styling
        */}
        <Route path="/nowPlaying" element={<NowPlayingPage />} />
        <Route path="/toprating" element={<TopRatingPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
      </Route>

      {/* 
        Independent route for booking tickets
        NOT nested in Layout - likely has its own unique layout
        Uses URL parameter :movieId to identify which movie to book
      */}
      <Route path="/nowplaying/:movieId" element={<MovieOverview />} />
      <Route path="/upcoming/:movieId" element={<MovieOverview />} />
      <Route path="/toprating/:movieId" element={<MovieOverview />} />
      <Route path="/nowplaying/bookticket/:movieId" element={<BookTicket />} />
    </Routes>
  );
}
