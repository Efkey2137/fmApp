import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import RatePlayer from "./pages/RatePlayer";
import TrackProgress from "./pages/TrackProgress";
import Compare from "./pages/Compare";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to AskMngr</h1>} />
            <Route path="/rate-player" element={<RatePlayer />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/track-progress" element={<TrackProgress />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
