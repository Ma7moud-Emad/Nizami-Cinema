import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * GradualSpacing component - Creates a staggered letter animation effect
 * Each character animates in sequentially with a fade and slide motion
 * Perfect for attention-grabbing headings and titles
 */
export default function GradualSpacing({ text }: { text: string }) {
  // Ref to track when the component enters the viewport
  const ref = useRef(null);

  // Hook to detect when the element is in view (triggers only once)
  const isInView = useInView(ref, { once: true });

  return (
    // Container with horizontal spacing between letters
    <div className="flex space-x-1 py-8">
      {/* 
        AnimatePresence enables exit animations for children
        Not strictly necessary here since we're not removing elements,
        but could be useful for dynamic text changes
      */}
      <AnimatePresence>
        {/* Split text into individual characters for animation */}
        {text.split("").map((char, i) => (
          <motion.p
            ref={ref} // Attach the viewport detection ref
            key={i} // Unique key for each character
            // Initial state: hidden and positioned to the left
            initial={{ opacity: 0, x: -18 }}
            // Animate when element comes into view
            whileInView={isInView ? { opacity: 1, x: 0 } : {}}
            // Exit animation state (used with AnimatePresence)
            exit="hidden"
            // Staggered animation: each character delays based on its position
            transition={{
              duration: 0.5, // Animation duration in seconds
              delay: i * 0.1, // Each character delays by 0.1s more than the previous
            }}
            // Typography styling - responsive font sizes and bold weight
            className="text-xl sm:text-xl md:text-3xl font-bold tracking-tighter"
          >
            {/* Preserve spaces in the text (non-breaking spaces) */}
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}
