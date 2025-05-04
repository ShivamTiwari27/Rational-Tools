import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const OwqiCalculator = () => {
  const [formData, setFormData] = useState({
    temperature: "",
    dissolvedOxygen: "",
    bod: "",
    ph: "",
    ammoniaNitrate: "",
    totalPhosphorus: "",
    tds: "",
    coliforms: "",
  });

  const [owqi, setOwqi] = useState(null);
  const [quality, setQuality] = useState("");

  // Sub-index calculation function
  const calculateSubindex = (value, ideal) => {
    if (!value) return 0;
    return (value / ideal) * 100;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData({
      temperature: "",
      dissolvedOxygen: "",
      bod: "",
      ph: "",
      ammoniaNitrate: "",
      totalPhosphorus: "",
      tds: "",
      coliforms: "",
    });
    setOwqi(null);
    setQuality("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const idealValues = {
      temperature: 25, // Ideal value for temperature
      dissolvedOxygen: 7, // mg/L
      bod: 3, // mg/L
      ph: 7.5,
      ammoniaNitrate: 0.5, // mg/L
      totalPhosphorus: 0.1, // mg/L
      tds: 500, // mg/L
      coliforms: 50, // CFU/100mL
    };

    let sumInverseSiSquared = 0;
    let n = 0;

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        n++;
        const subIndex = calculateSubindex(
          parseFloat(formData[key]),
          idealValues[key]
        );
        sumInverseSiSquared += 1 / Math.pow(subIndex, 2);
      }
    });

    if (n > 0) {
      const owqiValue = Math.sqrt(n / sumInverseSiSquared);
      setOwqi(owqiValue.toFixed(2));

      // Determine quality based on OWQI value
      if (owqiValue >= 90) {
        setQuality("Excellent");
      } else if (owqiValue >= 85) {
        setQuality("Good");
      } else if (owqiValue >= 70) {
        setQuality("Fair");
      } else if (owqiValue >= 60) {
        setQuality("Poor");
      } else {
        setQuality("Very Poor");
      }
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary">🌊 OWQI Calculator</h1>

      <p className="text-center text-muted">
        The Oregon Water Quality Index (OWQI) evaluates the health of water
        using key parameters. A higher OWQI indicates better water quality.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="row g-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="col-md-6">
            <label className="form-label fw-bold text-secondary">
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^\w/, (c) => c.toUpperCase())}
            </label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="form-control shadow-sm"
              placeholder={`Enter ${key}`}
              min="0"
              step="0.1"
              required
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary px-4 py-2 me-3">
            Calculate
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-outline-secondary px-4 py-2"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Result */}
      {owqi !== null && (
        <div className="mt-5 text-center">
          <h3>
            OWQI:{" "}
            <span
              className={`badge ${quality === "Excellent"
                  ? "bg-success"
                  : quality === "Good"
                    ? "bg-primary"
                    : quality === "Fair"
                      ? "bg-warning"
                      : quality === "Poor"
                        ? "bg-danger"
                        : "bg-dark"
                }`}
            >
              {owqi} ({quality})
            </span>
          </h3>
        </div>
      )}

      {/* Quality Scale */}
      <div className="mt-5">
        <h4 className="text-center text-muted">OWQI Quality Scale:</h4>
        <ul className="list-group">
          <li className="list-group-item bg-success text-white">90-100 → Excellent</li>
          <li className="list-group-item bg-primary text-white">85-89 → Good</li>
          <li className="list-group-item bg-warning text-dark">70-84 → Fair</li>
          <li className="list-group-item bg-danger text-white">60-70 → Poor</li>
          <li className="list-group-item bg-dark text-white">0-59 → Very Poor</li>
        </ul>
      </div>

      {/* More Info */}
      <div className="mt-4 text-center">
        <a
          href="https://www.oregon.gov/deq/wq/Pages/WQI.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary"
        >
          Learn more about OWQI →
        </a>
      </div>

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

export default OwqiCalculator;
