import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import Navigation from "./components/Navigation";
import RatePlayer from "./pages/RatePlayer";
import TrackProgress from "./pages/TrackProgress";
import Compare from "./pages/Compare";
import Wonderkids from "./pages/Wonderkids";
import SaveIdeas from "./pages/SaveIdeas";
import Home from "./pages/Dashboard"
import FAQ from "./pages/Faq"
import RateTeam from "./pages/RateTeam";
import "./index.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Funkcja do przekazania do komponentu Navigation
  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  return (
    <Router>
      <Analytics/>
      <SpeedInsights/>
      <div className="App">
        <Navigation onCollapseChange={handleCollapse} />
        <main 
          className={`
            transition-all duration-300 p-[2dvh] overflow-y-auto h-[100dvh]
            ${isCollapsed ? 'md:ml-[80px] md:w-[calc(100%-80px)]' : 'md:ml-[300px] md:w-[calc(100%-300px)]'}
            max-md:ml-0 max-md:w-full max-md:h-[calc(100vh-10dvh)] max-md:mt-[10dvh]
          `}
        >
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/rate-player" element={<RatePlayer />} />
            <Route path="/rate-team" element={<RateTeam />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/track-progress" element={<TrackProgress />} />
            <Route path="/save-ideas" element={<SaveIdeas />} />
            <Route path="/wonderkids" element={<Wonderkids />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
