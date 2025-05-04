import React, { useState } from "react";
import CWQI from "./Cwqi"
import NFSWQI from "./Nfswqi";
import WQI from "./Wqi";
import OwqiCalculator from "./OwqiCalculator";
import MlWqiCalculator from "./MlWqiCalculator";
import "bootstrap/dist/css/bootstrap.min.css";

const WQISelector = () => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleSelection = (e) => {
    setSelectedMethod(e.target.value);
  };

  return (
    <div className="container mt-5">
      {/* Heading */}
      <h1 className="text-center mb-4 text-primary">
        🌊 Water Quality Index (WQI) Calculator
      </h1>

      {/* Definitions Section */}
      <div className="mb-5">
        <h3 className="text-center text-secondary">What is Water Quality Index?</h3>
        <p className="text-muted text-center">
          Water Quality Index (WQI) is a numeric value that represents the overall water quality based on different physical, chemical, and biological parameters. It helps to monitor and manage water quality efficiently.
        </p>

        <div className="card shadow-sm p-3 mb-4 bg-light">
          <h5 className="text-dark">Types of WQI Methods:</h5>
          <ul>
            <li>
              <strong>Canadian Water Quality Index (CWQI):</strong> Measures deviation from ideal conditions based on scope, frequency, and amplitude.
            </li>
            <li>
              <strong>National Sanitation Foundation Water Quality Index (NSFWQI):</strong> Uses a weighted sum of sub-indexes to calculate the overall water quality.
            </li>
            <li>
              <strong>Weighted Arithmetic Water Quality Index (WAWQI):</strong> Uses weighted averages of sub-index values.
            </li>
            <li>
              <strong>Oregon Water Quality Index (OWQI):</strong> Uses the harmonic mean of inverse squared sub-index values.
            </li>
            <li>
              <strong>Machine Learning (ML) Based WQI:</strong> Uses a trained ML model to predict WQI based on real-time input data.
            </li>
          </ul>
        </div>
      </div>

      {/* Dropdown */}
      <div className="text-center mb-4">
        <select
          className="form-select shadow-sm w-50 mx-auto"
          onChange={handleSelection}
          value={selectedMethod}
        >
          <option value="">Select WQI Method</option>
          <option value="cwqi">Canadian Water Quality Index (CWQI)</option>
          <option value="nsfwqi">National Sanitation Foundation Water Quality Index (NSFWQI)</option>
          <option value="wawqi">Weighted Arithmetic Water Quality Index (WAWQI)</option>
          <option value="owqi">Oregon Water Quality Index (OWQI)</option>
          <option value="mlwqi">Machine Learning-Based WQI</option>
        </select>
      </div>

      {/* Render the selected method */}
      <div className="mt-4">
        {selectedMethod === "cwqi" && <CWQI />}
        {selectedMethod === "nsfwqi" && <NFSWQI />}
        {selectedMethod === "wawqi" && <WQI />}
        {selectedMethod === "owqi" && <OwqiCalculator />}
        {selectedMethod === "mlwqi" && <MlWqiCalculator />}
      </div>
    </div>
  );
};

export default WQISelector;
