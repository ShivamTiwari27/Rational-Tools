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

      <div className="tools-container-main">
        <div className="tools-container">
          <div className="tool">
            <Link to="/hydrotools" className="tool-link">
              <div className="tool-content">
                <img src={require('./asdf.jpg')} alt="tool image 1" className="tool-image" />
                <p className="tool-description">Rational Method Tool</p>
              </div>
            </Link>
          </div>

          <div className="tool">
            <Link to="/mixedland" className="tool-link">
              <div className="tool-content">
                <img src={require('./images.jpg')} alt="tool image 2" className="tool-image" />
                <p className="tool-description">Composite Runoff</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="tools-container">
          <div className="tool">
            <Link to="/rmse" className="tool-link">
              <div className="tool-content">
                <img src={require('./graph.jpg')} alt="tool image 3" className="tool-image" />
                <p className="tool-description">Error Calculation</p>
              </div>
            </Link>
          </div>

          <div className="tool">
            <Link to="/wqi" className="tool-link">
              <div className="tool-content">
                <img src={require('./wqi.jpg')} alt="tool image 4" className="tool-image" />
                <p className="tool-description">WQI</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tools;
