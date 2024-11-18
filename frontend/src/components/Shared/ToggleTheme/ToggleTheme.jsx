  import React, { useState, useEffect } from "react";
  import "./ToggleTheme.css";

  const ToggleTheme = () => {
    const [isDay, setIsDay] = useState(false);

    // Function to toggle the theme
    const toggleTheme = () => {
      const newTheme = !isDay;
      setIsDay(newTheme);
      // Store the new theme in localStorage
      localStorage.setItem("theme", newTheme ? "day" : "night");
    };

    useEffect(() => {
      // Retrieve the theme from localStorage when the component is mounted
      const savedTheme = localStorage.getItem("theme");
      
      // If a theme is found in localStorage, set the theme based on it
      if (savedTheme === "day") {
        setIsDay(true);
      } else {
        setIsDay(false);
      }

      // Update the `body` class when the theme changes
      document.body.classList.toggle("light-mode", isDay);
      document.body.classList.toggle("dark-mode", !isDay);
    }, [isDay]);

    return (
      <div
        className={`tdnn ${isDay ? "day" : ""} w-12 h-7`}
        onClick={toggleTheme}
        title="Toggle Theme"
      >
        <div className={`moon ${isDay ? "sun" : ""}`}></div>
      </div>
    );
  };

  export default ToggleTheme;
