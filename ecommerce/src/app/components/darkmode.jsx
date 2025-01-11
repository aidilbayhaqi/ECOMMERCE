import React, { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="flex justify-center">
      <button
        className={`${
          darkMode
            ? " hover:bg-dark-primary "
            : " hover:bg-secondary"
        } text-white font-bold py-2 px-4 rounded`}
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <MdLightMode className="w-5 h-5" />
        ) : (
          <MdDarkMode className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default DarkModeToggle;
