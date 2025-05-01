import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const MlWqiCalculator = () => {
  const [formData, setFormData] = useState({
    ph: '',
    tds: '',
    bod: '',
    do: '',
    nitrate: '',
    chloride: '',
    alkalinity: '',
    totalHardness: '',
    conductivity: '',
    calcium: '',
    magnesium: ''
  });

  const [result, setResult] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only send non-empty values
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== '')
    );

    try {
      const response = await axios.post('http://localhost:5000/predict', filteredData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResult(response.data.wqi);
    } catch (error) {
      console.error('Error fetching WQI:', error);
    }
  };

  
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="text-center text-success mb-4">Machine Learning-Based WQI</h2>

      <form onSubmit={handleSubmit} className="row g-3">
        {Object.keys(formData).map((key) => (
          <div key={key} className="col-md-4">
            <label className="form-label">{key.toUpperCase()}</label>
            <input
              type="number"
              className="form-control shadow-sm"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              min="0"
            />
          </div>
        ))}

        <div className="col-12 text-center mt-4">
          <button type="submit" className="btn btn-primary px-4 py-2 me-3">
            Predict WQI
          </button>
          <button
            type="reset"
            className="btn btn-secondary px-4 py-2"
            onClick={() => {
              setFormData({
                ph: '', tds: '', bod: '', do: '', nitrate: '', chloride: '',
                alkalinity: '', totalHardness: '', conductivity: '', calcium: '', magnesium: ''
              });
              setResult(null);
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {result !== null && (
        <div className="mt-4 text-center">
          <h4>
            Predicted WQI:{" "}
            <span className={`badge bg-${result > 90 ? 'success' : result > 70 ? 'info' : result > 50 ? 'warning' : 'danger'}`}>
              {result}
            </span>
          </h4>
        </div>
      )}

      {/* Action Button */}
      <div className="d-flex justify-content-end mt-4">
                <button
                    type="button"
                    className="btn btn-danger px-4 py-2 shadow-sm"
                    onClick={() => navigate("/RMSE")}
                >
                    Calculate Error Here
                </button>
            </div>
    </div>
  );
};

export default MlWqiCalculator;
