import React, { useState, useEffect } from 'react';
import { BsChevronRight, BsSearch, BsHouse, BsHeart, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' // Retrieve user preference
  );

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark'); // Add 'dark' class to body
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? '' : 'close'} ${isDarkMode ? 'dark' : ''}`}>
      <header>
        <div className="image-text">
          <span className="image"></span>
          <div className="text logo-text">
            <span className="name">Hydro Tool</span>
            <span className="profession">Web Application</span>
          </div>
        </div>
        <BsChevronRight className="toggle" onClick={toggleSidebar} />
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <BsSearch className="icon" />
            <input type="text" placeholder="Search..." />
          </li>
          <li className="nav-link">
            <a href="/">
              <BsHouse className="icon" />
              <span className="text nav-text">Home</span>
            </a>
          </li>
          <li className="nav-link" onClick={() => navigate('/tools')}>
            <BsHeart className="icon" />
            <span className="text nav-text">Tool</span>
          </li>
        </div>

        <div className="bottom-content">
          <li className="mode">
            <div className={`sun-moon ${isSidebarOpen ? '' : 'hidden'}`} onClick={toggleDarkMode}>
              {isDarkMode ? <BsMoonFill className="icon moon" /> : <BsSunFill className="icon sun" />}
            </div>
            <span className="mode-text text">{isDarkMode ? 'Dark mode' : 'Light mode'}</span>
            <div className="toggle-switch" onClick={toggleDarkMode}>
              <span className={`switch ${isDarkMode ? 'dark' : 'light'}`}></span>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
