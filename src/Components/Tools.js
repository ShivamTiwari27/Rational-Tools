import React from 'react';
import { Link } from 'react-router-dom';
import './Tools.css';
import Sidebar from './Sidebar';

function Tools() {
  return (
    <div>
      <Sidebar />
      <div className="container">
        <h1 className="display-1 hydro-tool-title text-center mt-5 mb-5">
          <span className="hydro-text-primary" style={{ fontFamily: 'Montserrat, sans-serif' }}>Hydro</span>
          <span className="hydro-text-secondary" style={{ fontFamily: 'Roboto, sans-serif' }}>Tools</span>
        </h1>
      </div>

        <div className="tools-container">

          <div className="tool">
            <Link to="/WQISelector" className="tool-link">
              <div className="tool-content">
                <img src={require('./wqi.jpg')} alt="tool image 4" className="tool-image" />
                <p className="tool-description">WQI</p>
              </div>
            </Link>
          </div>


        </div>
      </div>
  );
}

export default Tools;
