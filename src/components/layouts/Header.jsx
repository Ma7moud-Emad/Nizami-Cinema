import { Link } from "react-router-dom";
import logo from "../../assests/logo.svg";
import { GoPerson } from "react-icons/go";
import ToggleButton from "./ToggleButton";

/**
 * Header component for the application
 * Fixed position header with logo and user controls
 * Appears at the top of all pages
 */
export default function Header() {
  return (
    // Header container with absolute positioning to overlay on top of content
    // z-100 ensures it stays above other elements (high z-index)
    <header className="absolute top-0 left-0 z-100 w-full p-2 flex justify-between items-center">
      {/* Logo link that navigates to home page */}
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="object-cover" // Ensures image maintains aspect ratio
        />
      </Link>

      {/* Right side controls container */}
      <div className="flex items-center gap-4 text-white text-2xl">
        {/* Theme toggle button component */}
        <ToggleButton />
        {/* User profile icon */}
        <GoPerson className="text-[#e5e5e5]" /> {/* Light gray color */}
      </div>
    </header>
  );
}
