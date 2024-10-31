import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./context/theme";
import ThemeBtn from "./components/themeBtn";
import Card from "./components/card";

const ThemeApp = () => {
  const [themeMode, setThemeMode] = useState("light");
  

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector("html")!.classList.remove("dark", "light");
    document.querySelector("html")!.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ThemeApp;
