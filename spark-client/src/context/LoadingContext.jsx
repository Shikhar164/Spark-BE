import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import eventEmitter from "../eventEmitter";

// Create Context
const LoadingContext = createContext();

// Provider Component
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false); // Fixed 'cconst' typo

  useEffect(() => {
    const handleLoading = (isLoading) => setLoading(isLoading);
    eventEmitter.on("loading", handleLoading);

    return () => {
      eventEmitter.off("loading", handleLoading); // Cleanup listener
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// PropTypes Validation
LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom Hook to Use Loading Context
// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};