// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";

/**
 * Footer component that displays site links, social media, and copyright information
 * Responsive design with dark mode support
 */
export default function Footer() {
  return (
    // Footer container with light/dark mode styling and padding
    <footer className="bg-[#fafafa] dark:bg-[#1a1919] pt-10 px-5 sm:px-20">
      {/* Main content section with flex layout for responsive columns */}
      <div className="flex justify-between items-center md:items-start flex-wrap pb-5">
        {/* Profile links section */}
        <Slice
          title="Profile"
          items={["FAQ's", "Pricing plans", "Order tracking", "Returns"]}
          delay={0}
        />

        {/* Recent posts section */}
        <Slice
          title="Recent Posts"
          items={["Touch of uniqueness", "Offices you won't forget", "Returns"]}
          delay={0.5}
        />

        {/* Customer service links */}
        <Slice
          title="CUSTOMER"
          items={[
            "Help & contact us",
            "Returns",
            "Online stores",
            "Terms & cordition",
          ]}
          delay={1}
        />

        {/* Social media icons with hover colors */}
        <Slice
          title="Contact"
          type="icons" // Special type for icon styling
          items={[
            <FaSquareInstagram />,
            <FaSquareXTwitter />,
            <FaFacebookSquare />,
          ]}
          // Background colors for hover states (index-matched with items)
          bgLisHover={["pink-600", "black", "blue-500"]}
          delay={1.5}
        />
      </div>

      {/* Divider line */}
      <hr className="text-[#3e3e3ea0] dark:text-[#ffffff26]" />

      {/* Copyright notice */}
      <p className="text-sm font-light py-2">
        © 2024 Nizami cinema. All Right Reserved
      </p>
    </footer>
  );
}

/**
 * Reusable section component for footer columns
 * @param {string} title - Section heading text
 * @param {Array} items - Array of links/text or icons to display
 * @param {Array} bgLisHover - Array of background colors for hover states (icons only)
 * @param {string} type - Determines styling: "links" (default) or "icons"
 */
function Slice({ title, items, bgLisHover = [], type = "links", delay }) {
  return (
    // Responsive width: full on small, half on medium, quarter on large screens
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: delay,
        type: "spring",
        stiffness: 50,
      }}
      className="w-1/2 md:w-1/4 mb-4"
    >
      {/* Section title */}
      <h2 className="mb-4 font-medium">{title}</h2>

      {/* List container - vertical for links, horizontal for icons */}
      <ul
        className={
          type == "links"
            ? "space-y-1" // Vertical spacing for links
            : "flex items-center gap-2 text-xl" // Horizontal layout for icons
        }
      >
        {/* Map through items to create list elements */}
        {items.map((item, index) => (
          <li
            key={index}
            className={
              type == "links"
                ? // Link styling: hover effect with background color change
                  "w-fit font-light text-sm cursor-pointer transition-all rounded-sm hover:bg-black hover:text-white dark:hover:text-white px-2 py-1"
                : // Icon styling: default gray color with hover color transition
                  `w-fit text-[#3e3e3ea0] dark:text-[#dadada] cursor-pointer transition hover:text-${bgLisHover[index]}`
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
