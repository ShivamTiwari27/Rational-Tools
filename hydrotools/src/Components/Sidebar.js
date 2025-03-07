import React, { useState } from 'react';
import { BsChevronRight, BsSearch, BsHouse, BsHeart, BsWallet, BsMoonFill, BsSunFill } from 'react-icons/bs';
// import { FaChartBar } from 'react-icons/fa';
import './Sidebar.css'
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook



const Sidebar = () => {
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleExploreTools = () => {
    navigate('/tools'); // Navigate to the '/tools' route
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState);
  };
  console.log(isSidebarOpen);

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
            <li className="nav-link">
              <a onClick={handleExploreTools}>
                <BsHeart className="icon" />
                <span className="text nav-text">Tool</span>
              </a>
            </li>
        </div>


        <div className="bottom-content">
          <li className="mode">
            <div className={`sun-moon ${isSidebarOpen ? '' : 'hidden'}`}>
              {isDarkMode ? <BsMoonFill className="icon moon" /> : <BsSunFill className="icon sun" />}
            </div>
            <span className="mode-text text">{isDarkMode ? 'Dark mode' : 'Light mode'}</span>
            <div className="toggle-switch" onClick={toggleDarkMode}>
              <span className="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;