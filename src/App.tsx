import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import Header from "./components/Header";
import Menu from "./components/Menu";
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

  return (
    
    <Router>
      <Analytics/>
      <div className="App">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
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

