import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";

/**
 * Create React Query client instance with default configuration
 * This manages server state, caching, and background updates
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

/**
 * Get the root DOM element where the React app will be mounted
 * Typically a div with id="root" in index.html
 */
const root = ReactDOM.createRoot(document.getElementById("root"));

/**
 * Render the React application to the DOM
 * Wraps the App component with necessary providers for:
 * - React Query (data fetching and state management)
 * - React Router (client-side routing)
 */
root.render(
  <StrictMode>
    {/* React Query Provider - enables data fetching capabilities throughout the
    app */}
    <QueryClientProvider client={queryClient}>
      {/* 
      React Router BrowserRouter - enables client-side routing
      Uses HTML5 history API for clean URLs without page refreshes
    */}
      <BrowserRouter>
        {/* 
        Main App component - contains all route definitions and application logic
        This is the root component of the entire React application
      */}
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
