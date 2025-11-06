import useFetch from "../../Hooks/useFetch";
import getPopular from "./../../Serveries/apis/popular";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  // Fetch popular movie data using custom hook
  const { data } = useFetch("top_rating", getPopular);

  // Refs and state for managing carousel dots
  const dotsContainerRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [currentSlide, setCurrentSlide] = useState(0);

  // Create an object mapping indices to backdrop images for dots
  const carouselImages = Array.isArray(data)
    ? data.reduce((acc, item, index) => {
        acc[index] = `https://image.tmdb.org/t/p/original${item.backdrop_path}`;
        return acc;
      }, {})
    : {};

  // Create array of poster images for the main carousel slides
  const images = Array.isArray(data)
    ? data.map(
        (item) => `https://image.tmdb.org/t/p/original${item.poster_path}`
      )
    : [];

  // Responsive configuration for the carousel
  const responsive = {
    all: {
      breakpoint: { min: 0, max: 5000 },
      items: 1, // Show one item at a time
    },
  };

  // Function to scroll the dots container to center the active dot
  const scrollToActiveDot = (index) => {
    if (dotsContainerRef.current) {
      const dotElement = dotsContainerRef.current.children[index];
      const container = dotsContainerRef.current;

      if (dotElement) {
        const containerWidth = container.offsetWidth;
        const dotLeft = dotElement.offsetLeft;
        const dotWidth = dotElement.offsetWidth;

        // Calculate the scroll position to center the dot
        const scrollPosition = dotLeft - containerWidth / 2 + dotWidth / 2;

        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

  // Handle dot click - navigate to slide and scroll to dot
  const handleDotClick = (onClick, index) => {
    onClick(); // Carousel's built-in click handler
    setCurrentSlide(index);
    scrollToActiveDot(index);
  };

  // Handle slide change - update current slide and scroll to active dot
  const handleBeforeChange = (nextSlide) => {
    setCurrentSlide(nextSlide);
    // Use requestAnimationFrame for better timing with the carousel animation
    requestAnimationFrame(() => {
      scrollToActiveDot(nextSlide);
    });
  };

  // Initialize scroll position when component mounts or data changes
  useEffect(() => {
    if (dotsContainerRef.current) {
      scrollToActiveDot(0); // Start at first slide
    }
  }, [data]); // Re-run when data changes

  return (
    <div className="relative">
      {/* Main carousel component */}
      <Carousel
        className="hero min-h-screen max-h-screen relative after:absolute after:top-0 after:left-0 after:bg-[#1d1d1d7f] after:z-40 after:w-full after:h-full"
        showDots={true}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={2000}
        transitionDuration={500}
        infinite={true}
        responsive={responsive}
        beforeChange={handleBeforeChange}
        // Custom dot component with image thumbnails
        customDot={
          <CustomDot
            carouselImages={carouselImages}
            onDotClick={handleDotClick}
          />
        }
        // Get reference to the dots container for scrolling
        ref={(carousel) => {
          if (carousel) {
            dotsContainerRef.current =
              carousel.containerRef?.current?.querySelector(
                ".react-multi-carousel-dot-list"
              );
          }
        }}
      >
        {/* Render carousel slides */}
        {images.map((movie, index) => {
          return (
            <img
              className="w-full h-full object-cover"
              key={index}
              src={movie}
              alt={`Movie ${index + 1}`}
              loading="lazy"
            />
          );
        })}
      </Carousel>
    </div>
  );
}

// Custom dot component that displays movie images as thumbnails
const CustomDot = ({ onClick, carouselImages, onDotClick, ...rest }) => {
  const { index, active } = rest;

  // Handle dot click with custom behavior
  const handleClick = () => {
    onDotClick(onClick, index);
  };

  return (
    <li>
      <button
        // Apply active styles when this dot represents the current slide
        className={`${active ? "active opacity-100" : "opacity-60"}`}
        onClick={handleClick}
      >
        {/* Display movie image as dot thumbnail */}
        <img
          src={carouselImages[index]}
          alt={`Slide ${index + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </button>
    </li>
  );
};
