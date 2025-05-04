import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const MlWqiCalculator = () => {

  const [formData, setFormData] = useState({
    Temperature: '', Conductivity: '', DO: '', BOD: '', NH4: '',
    NO3: '', Alk: '', pH: '',
    model_name: 'random_forest'
  });

  // 'Temperature', 'Conductivity', 'DO', 'BOD', 'NH4', 'NO3', 'Alk', 'pH'


  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredData = {
      ...Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => key === 'model_name' || value !== '')
      )
    };

    try {
      const response = await axios.post('https://wqi-k23q.onrender.com/predict', filteredData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResult(response.data.wqi);
    } catch (error) {
      console.error('Error fetching WQI:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center text-success mb-4">Machine Learning-Based WQI</h2>

      <form onSubmit={handleSubmit} className="row g-3">

        {/* Model Selector */}
        <div className="col-md-4">
          <label className="form-label">Select ML Model</label>
          <select
            className="form-select shadow-sm"
            name="model_name"
            value={formData.model_name}
            onChange={handleChange}
            required
          >
            <option value="linear_regression">Linear Regression</option>
            <option value="random_forest">Random Forest</option>
            <option value="decision_tree">Decision Tree</option>
            <option value="gradient_boosting">Gradient Boosting</option>
            <option value="knn">K-Nearest Neighbors</option>
          </select>
          <small className="text-muted">
            Recommended: <strong>Random Forest</strong> for balanced accuracy and generalization.
          </small>
        </div>

        {/* Water Quality Inputs */}
        {Object.keys(formData)
          .filter(key => key !== 'model_name')
          .map((key) => (
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

        {/* Buttons */}
        <div className="col-12 text-center mt-4">
          <button type="submit" className="btn btn-primary px-4 py-2 me-3">
            Predict WQI
          </button>
          <button
            type="reset"
            className="btn btn-secondary px-4 py-2"
            onClick={() => {
              setFormData({
                ph: '', bod: '', do: '', no3: '', nh4: '',
                alkalinity: '', conductivity: '', temperature: '',
                model_name: 'random_forest'
              });
              setResult(null);
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {/* Result */}
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
