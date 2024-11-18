import React, { useState, useEffect } from "react";
import "./ToggleTheme.css";

const ToggleTheme = () => {
  const [isDay, setIsDay] = useState(false);

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = !isDay;
    setIsDay(newTheme);

    // Update the `html` class to toggle dark mode
    document.documentElement.classList.toggle("dark", !newTheme);

    // Store the new theme in localStorage
    localStorage.setItem("theme", newTheme ? "day" : "night");
  };

  useEffect(() => {
    // Retrieve the theme from localStorage when the component is mounted
    const savedTheme = localStorage.getItem("theme");
    const isDayTheme = savedTheme === "day";

    setIsDay(isDayTheme);

    // Ensure the `html` class reflects the saved theme
    document.documentElement.classList.toggle("dark", !isDayTheme);
  }, []);

  return (
    <div
      className={`tdnn ${isDay ? "day" : "night"} w-12 h-7`}
      onClick={toggleTheme}
      title="Toggle Theme"
    >
      <div className={`icon ${isDay ? "sun" : "moon"}`}></div>
    </div>
  );
};

export default ToggleTheme;
