import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

const Header: React.FC<{ menuOpen: boolean; setMenuOpen: (open: boolean) => void }> = ({ menuOpen, setMenuOpen }) => {
  return (
    <header className="App-header">
      <div className="App-logo">
        <img src={logo} alt="logo" className="logo-img" />
      AskMngr
      </div>
      <button className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar top"></div>
        <div className="bar middle"></div>
        <div className="bar bottom"></div>
      </button>
    </header>
  );
};

export default Header;