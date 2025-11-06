// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

/**
 * LoadingThreeDotsPulse component - Animated loading indicator with three pulsing dots
 * Features staggered animation for a smooth, sequential pulsing effect
 */
function LoadingThreeDotsPulse({
  dotSize = 20, // Diameter of each dot in pixels
  color = "#ffffff", // Color of the dots (default white)
  gap = 20, // Space between dots in pixels
  className = "", // Additional CSS classes for custom styling
}) {
  /**
   * Animation variants for individual dots
   * Each dot pulses by scaling up/down and changing opacity
   */
  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1], // Scale: normal → 1.5x → normal
      opacity: [1, 0.7, 1], // Opacity: full → 70% → full
      transition: {
        duration: 1.2, // Complete animation cycle time
        repeat: Infinity, // Loop animation indefinitely
        ease: "easeInOut", // Smooth acceleration and deceleration
      },
    },
  };

  /**
   * Container variants to stagger children animations
   * Creates sequential pulsing effect across the three dots
   */
  const containerVariants = {
    pulse: {
      transition: {
        staggerChildren: 0.2, // 0.2s delay between each dot's animation
        delayChildren: 0, // No initial delay before starting
      },
    },
  };

  return (
    // Main container with flex layout and animation control
    <motion.div
      variants={containerVariants} // Stagger animation for children
      initial="initial" // Initial state before animation
      animate="pulse" // Active animation state
      className={`flex justify-center items-center gap-${
        gap / 4 // Convert pixel gap to Tailwind gap class (assuming 1 = 0.25rem)
      } min-h-screen ${className}`} // Full viewport height for centered loading
      role="status" // Accessibility role for loading state
      aria-label="Loading" // Screen reader announcement
    >
      {/* Create 3 dots with Array.from for consistent rendering */}
      {Array.from({ length: 3 }).map((_, index) => (
        <Dot
          key={index} // Unique key for each dot
          dotVariants={dotVariants} // Pass animation variants
          size={dotSize} // Dot diameter
          color={color} // Dot color
        />
      ))}
    </motion.div>
  );
}

/**
 * Individual Dot component - Renders a single animated dot
 * Pure presentational component that applies the animation variants
 */
function Dot({ dotVariants, size = 20, color = "#ffffff" }) {
  return (
    <motion.div
      className="rounded-full" // Circular shape
      style={{
        width: size, // Dot width
        height: size, // Dot height
        backgroundColor: color, // Dot color
      }}
      variants={dotVariants} // Apply pulsing animation
    />
  );
}

export default LoadingThreeDotsPulse;
