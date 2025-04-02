import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { LayoutDashboard, Star, Lightbulb, SearchCheck, MessageCircleQuestion, NotepadText, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface NavigationProps {
  onCollapseChange: (collapsed: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onCollapseChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const handleCloseMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapseChange(newCollapsedState);
  };

  return (
    <>
      {/* Header - widoczny tylko w wersji mobilnej */}
      <header className="md:hidden flex items-center justify-between bg-[#222] h-[10dvh] shadow-md px-[2dvw] w-full fixed top-0 z-10">
        <div className="flex items-center text-4xl font-bold uppercase text-[#9a66ff]">
          <img src={logo} alt="logo" className="w-[7dvh] h-[7dvh]" />
          {!isCollapsed && <span>AskMngr</span>}
        </div>
        <button 
          className={`flex flex-col justify-center items-center w-[10dvw] h-[10dvh] bg-transparent border-0 cursor-pointer relative z-11 ${menuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
        >
          <div className={`w-[40px] h-[4px] bg-[#9a66ff] my-[4px] transition-all duration-400 ${menuOpen ? 'transform translate-y-[12px] rotate-45' : ''}`}></div>
          <div className={`w-[40px] h-[4px] bg-[#9a66ff] my-[4px] transition-all duration-400 ${menuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-[40px] h-[4px] bg-[#9a66ff] my-[4px] transition-all duration-400 ${menuOpen ? 'transform -translate-y-[12px] -rotate-45' : ''}`}></div>
        </button>
      </header>

      {/* Menu nawigacyjne */}
      <nav className={`
        bg-[#1b1b1b] flex flex-col items-start h-[100dvh] shadow-md overflow-y-auto fixed top-0 left-0 z-9
        ${isCollapsed ? 'md:w-[80px]' : 'md:w-[300px]'} 
        transition-all duration-300
        ${menuOpen ? 'transform translate-x-0' : 'transform -translate-x-full md:translate-x-0'}
        ${!isCollapsed ? 'md:pt-[5dvh]' : 'md:pt-[5dvh]'}
        max-md:w-full max-md:pt-[12dvh]
        no-scrollbar
      `}>
        {/* Logo w menu */}
        <div className={`
          text-4xl font-bold uppercase text-[#9a66ff] no-underline 
          ${!isCollapsed ? 'mb-[3dvh] ml-[2dvh]' : 'mb-[3dvh] mx-auto'} 
          flex items-end 
          ${!isCollapsed ? 'justify-evenly' : 'justify-center'}
          max-md:hidden
        `}>
          <img src={logo} alt="logo" className="w-[7dvh] h-[7dvh]" />
          {!isCollapsed && <span>AskMngr</span>}
        </div>
        
        {/* Lista linków nawigacyjnych */}
        <ul className="list-none p-0 m-0 w-full">
          <li className="w-full text-left">
            <Link to="/" 
              className={`
                text-[#eeeeee] no-underline ${!isCollapsed ? 'p-[2.5dvh]' : 'p-[3dvh]'} text-xl font-semibold transition-all duration-300 flex 
                ${!isCollapsed ? 'items-center' : 'justify-center'} 
                hover:bg-[#393046] hover:text-[#9a66ff] 
                ${!isCollapsed ? 'hover:border-l-4 hover:border-[#9a66ff]' : ''}
                max-md:justify-center max-md:text-3xl max-md:py-[1.5dvh] max-md:px-[2dvw]
              `} 
              onClick={handleCloseMenu}
            >
              <LayoutDashboard className={`${!isCollapsed ? 'mr-[0.5dvw] text-xl' : 'text-3xl'} max-md:hidden`} />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li className="w-full text-left">
            <Link to="/rate-player" 
              className={`
                text-[#eeeeee] no-underline ${!isCollapsed ? 'p-[2.5dvh]' : 'p-[3dvh]'} text-xl font-semibold transition-all duration-300 flex 
                ${!isCollapsed ? 'items-center' : 'justify-center'} 
                hover:bg-[#393046] hover:text-[#9a66ff] 
                ${!isCollapsed ? 'hover:border-l-4 hover:border-[#9a66ff]' : ''}
                max-md:justify-center max-md:text-3xl max-md:py-[1.5dvh] max-md:px-[2dvw]
              `} 
              onClick={handleCloseMenu}
            >
              <SearchCheck className={`${!isCollapsed ? 'mr-[0.5dvw] text-xl' : 'text-3xl'} max-md:hidden`} />
              {!isCollapsed && <span>Rate Player</span>}
            </Link>
          </li>
          <li className="w-full text-left">
            <Link to="/rate-team" 
              className={`
                text-[#eeeeee] no-underline ${!isCollapsed ? 'p-[2.5dvh]' : 'p-[3dvh]'} text-xl font-semibold transition-all duration-300 flex 
                ${!isCollapsed ? 'items-center' : 'justify-center'} 
                hover:bg-[#393046] hover:text-[#9a66ff] 
                ${!isCollapsed ? 'hover:border-l-4 hover:border-[#9a66ff]' : ''}
                max-md:justify-center max-md:text-3xl max-md:py-[1.5dvh] max-md:px-[2dvw]
              `} 
              onClick={handleCloseMenu}
            >
              <NotepadText className={`${!isCollapsed ? 'mr-[0.5dvw] text-xl' : 'text-3xl'} max-md:hidden`} />
              {!isCollapsed && <span>Rate Team</span>}
            </Link>
          </li>
          <li className="w-full text-left">
            <Link to="/wonderkids" 
              className={`
                text-[#eeeeee] no-underline ${!isCollapsed ? 'p-[2.5dvh]' : 'p-[3dvh]'} text-xl font-semibold transition-all duration-300 flex 
                ${!isCollapsed ? 'items-center' : 'justify-center'} 
                hover:bg-[#393046] hover:text-[#9a66ff] 
                ${!isCollapsed ? 'hover:border-l-4 hover:border-[#9a66ff]' : ''}
                max-md:justify-center max-md:text-3xl max-md:py-[1.5dvh] max-md:px-[2dvw]
              `} 
              onClick={handleCloseMenu}
            >
              <Star className={`${!isCollapsed ? 'mr-[0.5dvw] text-xl' : 'text-3xl'} max-md:hidden`} />
              {!isCollapsed && <span>Wonderkids</span>}
            </Link>
          </li>
          <li className="w-full text-left">
            <Link to="/save-ideas" 
              className={`
                text-[#eeeeee] no-underline ${!isCollapsed ? 'p-[2.5dvh]' : 'p-[3dvh]'} text-xl font-semibold transition-all duration-300 flex 
                ${!isCollapsed ? 'items-center' : 'justify-center'} 
                hover:bg-[#393046] hover:text-[#9a66ff] 
                ${!isCollapsed ? 'hover:border-l-4 hover:border-[#9a66ff]' : ''}
                max-md:justify-center max-md:text-3xl max-md:py-[1.5dvh] max-md:px-[2dvw]
              `} 
              onClick={handleCloseMenu}
            >
              <Lightbulb className={`${!isCollapsed ? 'mr-[0.5dvw] text-xl' : 'text-3xl'} max-md:hidden`} />
              {!isCollapsed && <span>Save Ideas</span>}
            </Link>
          </li>
          <li className="w-full text-left">
            <Link to="/faq" 
              className={`
                text-[#eeeeee] no-underline ${!isCollapsed ? 'p-[2.5dvh]' : 'p-[3dvh]'} text-xl font-semibold transition-all duration-300 flex 
                ${!isCollapsed ? 'items-center' : 'justify-center'} 
                hover:bg-[#393046] hover:text-[#9a66ff] 
                ${!isCollapsed ? 'hover:border-l-4 hover:border-[#9a66ff]' : ''}
                max-md:justify-center max-md:text-3xl max-md:py-[1.5dvh] max-md:px-[2dvw]
              `} 
              onClick={handleCloseMenu}
            >
              <MessageCircleQuestion className={`${!isCollapsed ? 'mr-[0.5dvw] text-xl' : 'text-3xl'} max-md:hidden`} />
              {!isCollapsed && <span>FAQ</span>}
            </Link>
          </li>
        </ul>
        
        {/* Przycisk zwijania/rozwijania menu - tylko na desktopie */}
        <div className="absolute bottom-5 w-full flex justify-center px-4 max-md:hidden">
          <button 
            className={`
              flex items-center justify-center bg-transparent border border-gray-400 rounded px-3 py-2 cursor-pointer w-full
              text-inherit transition-colors duration-200 hover:bg-black/10
              ${isCollapsed ? 'py-2 justify-center' : ''}
            `} 
            onClick={toggleCollapse}
          >
            {isCollapsed ? <ChevronsRight className="text-2xl" /> : <ChevronsLeft className="text-2xl" />}
            {!isCollapsed && <span className="ml-2">Zwiń menu</span>}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
