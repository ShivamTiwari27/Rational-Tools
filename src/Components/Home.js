import Sidebar from './Sidebar';
import React from 'react';
import { motion } from 'framer-motion';
import './Home.css'; // Import your CSS file for additional styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook


const Home = () => {

  const navigate = useNavigate(); // Initialize useNavigate

  const handleExploreTools = () => {
    navigate('/tools'); // Navigate to the '/tools' route
  };
  return (
    <div className="home-container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="header"
      >

<div style={{ overflow: 'hidden' }}>
      <Sidebar />
      {/* <img src={require('./drop.jpg')} alt="bg" style={{ width: '100%', height: 'auto', position: 'fixed', top: 0, left: 0 }} /> */}
    </div>
        <h1 className="title">Welcome to HYDRO-TOOLS</h1>
        <p className="subtitle">Your solution for water management</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="content"
      >
        <p className="info">
          Hydro-tools are essential for effective water management. Whether you're
          monitoring water levels, controlling irrigation systems, analyzing
          water quality, or conducting research, our tools provide the necessary functionality 
          to ensure efficient use of this precious resource.
        </p>
        <p className="importance">
          Water is crucial for sustaining life and supporting ecosystems. It covers over 70% of the Earth's surface, 
          playing a vital role in climate regulation, food production, transportation, and recreation.
          However, water resources are finite and facing increasing pressures from population growth, urbanization,
          pollution, and climate change. Therefore, it's imperative to manage water resources wisely to ensure 
          equitable access and environmental sustainability.
        </p>

        
        
        {/* Button to explore tools page */}
        <button className="explore-button" onClick={handleExploreTools}>
          Explore Tools
        </button>

      </motion.div>
    </div>
  );
};

export default Home;

