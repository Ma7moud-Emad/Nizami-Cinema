// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import GradualSpacing from "../ui/gradualSpacing";
import { Link } from "react-router-dom";

/**
 * SectionList component - Reusable section container with animated title and optional navigation
 * Provides consistent styling and animation for content sections throughout the app
 */
export default function SectionList({
  title, // Section title text (displayed with GradualSpacing animation)
  children, // Section content (movie carousels, grids, etc.)
  path, // Optional route path for "See More" navigation link
}) {
  return (
    // Animated section container with fade-in effect when entering viewport
    <motion.section
      initial={{ opacity: 0 }} // Start invisible
      whileInView={{ opacity: 1 }} // Fade in when in viewport
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100, // Spring physics for bouncy entrance
      }}
      className="p-4" // Padding around the entire section
    >
      {/* Header section with title and optional "See More" link */}
      <div className="flex justify-between items-center">
        {/* Animated title with staggered letter spacing effect */}
        <GradualSpacing text={title} />

        {/* Conditionally render "See More" link if path is provided */}
        {path && (
          <Link
            to={path}
            className="capitalize px-4 py-2 rounded-md hover:bg-black/80 dark:hover:bg-white/80 hover:text-white dark:hover:text-black transition-colors"
            // Hover effects with dark mode support:
            // - Light mode: black background with white text
            // - Dark mode: white background with black text
            // - Smooth color transitions
          >
            see more
          </Link>
        )}
      </div>

      {/* Section content (movie carousels, grids, etc.) */}
      {children}
    </motion.section>
  );
}
