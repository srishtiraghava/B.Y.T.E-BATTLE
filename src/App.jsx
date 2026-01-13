import React from "react";
import "./global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ByteBattleHomepage from "./components/ByteBattleHomepage.jsx";
import Login from "./components/Login.jsx";
import { ThemeProvider, useTheme } from "./components/ThemeContext.jsx";
import FallingCubes from "./components/FallingCubes.jsx";
import ElectricBorder from "./components/ElectricBoarder.tsx";

/* Background Layer */
const Background = () => {
  const { isDark } = useTheme();
  return <FallingCubes theme={isDark ? "dark" : "light"} />;
};

function App() {
  return (
    <ThemeProvider>
      <Background />

      <Router>
        <Routes>
          <Route path="/" element={<ByteBattleHomepage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;