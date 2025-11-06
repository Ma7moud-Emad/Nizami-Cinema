import { Outlet } from "react-router-dom";
import Header from "./Header";
import Hero from "../ui/Hero";
import Footer from "./Footer";

/**
 * Main layout component that wraps the entire application
 * Provides consistent structure with header, hero section, main content, and footer
 * Uses React Router's Outlet for nested route rendering
 */
export default function Layout() {
  return (
    // Root container for the entire application layout
    <div>
      {/* Fixed header component - appears at top of all pages */}
      <Header />

      {/* Hero section - typically contains banner/header content */}
      <Hero />

      {/* Main content area where page-specific content will be rendered */}
      <main>
        {/* 
          Outlet component from React Router - renders the matched child route component
          This is where different pages (Home, About, Contact, etc.) will be displayed
          while maintaining the consistent header/hero/footer layout
        */}
        <Outlet />
      </main>

      {/* Footer component - appears at bottom of all pages */}
      <Footer />
    </div>
  );
}
