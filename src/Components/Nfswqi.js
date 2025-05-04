import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NFSWQI.css";


const weights = {
    do: 0.17,
    fecalColiform: 0.16,
    pH: 0.11,
    bod: 0.11,
    temperatureChange: 0.10,
    totalPhosphates: 0.10,
    nitrates: 0.10,
    turbidity: 0.08,
    totalSolids: 0.07
};

const subIndex = {
    do: (value) => Math.min(100, (value / 14) * 100), // Assuming 14 is the maximum safe DO value
    fecalColiform: (value) => Math.max(0, 100 - value * 5),
    pH: (value) => Math.max(0, 100 - Math.abs(value - 7) * 10),
    bod: (value) => Math.max(0, 100 - value * 8),
    temperatureChange: (value) => Math.max(0, 100 - value * 5),
    totalPhosphates: (value) => Math.max(0, 100 - value * 10),
    nitrates: (value) => Math.max(0, 100 - value * 2),
    turbidity: (value) => Math.max(0, 100 - value * 5),
    totalSolids: (value) => Math.max(0, 100 - value * 4)
};

const NFSWQI = () => {
    const [formData, setFormData] = useState({
        do: "",
        fecalColiform: "",
        pH: "",
        bod: "",
        temperatureChange: "",
        totalPhosphates: "",
        nitrates: "",
        turbidity: "",
        totalSolids: ""
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: parseFloat(e.target.value)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let totalWeightedSubIndex = 0;
        let totalWeight = 0;

        Object.keys(weights).forEach((key) => {
            if (formData[key] !== "") {
                const subIndexValue = subIndex[key](formData[key]);
                totalWeightedSubIndex += subIndexValue * weights[key];
                totalWeight += weights[key];
            }
        });

        const wqi = totalWeight > 0 ? totalWeightedSubIndex / totalWeight : 0;
        setResult(wqi.toFixed(2));
    };

    const getWaterQuality = (value) => {
        if (value >= 90) return { status: "Excellent", color: "#28a745" }; // Green
        if (value >= 70) return { status: "Good", color: "#007bff" }; // Blue
        if (value >= 50) return { status: "Medium", color: "#ffc107" }; // Yellow
        if (value >= 25) return { status: "Poor", color: "#fd7e14" }; // Orange
        return { status: "Very Poor", color: "#dc3545" }; // Red
    };

    const handleReset = () => {
        setFormData({
            do: "",
            fecalColiform: "",
            pH: "",
            bod: "",
            temperatureChange: "",
            totalPhosphates: "",
            nitrates: "",
            turbidity: "",
            totalSolids: ""
        });
        setResult(null);
    };

    const navigate = useNavigate();


    return (
        <div className="container mt-5">
            {/* Introduction */}
            <div className="card shadow-lg p-4 border-0 rounded-4 bg-white">
                <h2 className="text-center mb-4 fw-bold">🌊 NSFWQI Calculator</h2>
                <p className="text-muted text-center">
                    The **National Sanitation Foundation Water Quality Index (NSFWQI) is a commonly used
                    method to evaluate the overall water quality by combining the effects of multiple water quality
                    parameters into a single score. The NSFWQI is calculated based on weighted sub-index values for
                    different parameters like pH, dissolved oxygen, nitrates, turbidity, and more.
                </p>
                <p className="text-muted">
                    Each parameter is assigned a weight based on its importance to overall water quality.
                    The final NSFWQI value is calculated using the formula:
                </p>
                <pre className="code-block">
                    WQI = (Σ (Subindex * Weight)) ÷ Σ (Weights)
                </pre>

                <p className="text-muted">
                    For more details:
                    <a
                        href="https://www.researchgate.net/publication/337881191_Various_methods_for_calculating_the_water_quality_index"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ms-2"
                    >
                        Click here
                    </a>
                </p>

                <div className="mt-3 mb-3">

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="row g-3">
                        {Object.keys(weights).map((key) => (
                            <div key={key} className="col-md-4">
                                <label className="form-label fw-bold text-secondary">
                                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                                </label>
                                <input
                                    type="number"
                                    name={key}
                                    className="form-control shadow-sm rounded-pill"
                                    value={formData[key]}
                                    onChange={handleChange}
                                    placeholder={`${key}`}
                                    min="0"
                                />
                            </div>
                        ))}

                        <div className="col-12 text-center mt-4">
                            <button type="submit" className="btn btn-primary px-5 py-2 me-3 shadow-sm rounded-pill">
                                Calculate
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="btn btn-outline-secondary px-5 py-2 shadow-sm rounded-pill"
                            >
                                Reset
                            </button>
                        </div>
                    </form>

                    {/* Result */}
                    {result && (
                        <div
                            className="result-box mt-5 mx-auto"
                            style={{
                                backgroundColor: getWaterQuality(result).color,
                                color: "#fff"
                            }}
                        >
                            <h4 className="fw-bold">Water Quality Index: {result}</h4>
                            <p>Status: {getWaterQuality(result).status}</p>
                        </div>
                    )}

                    {/* Ranges */}
                    <div className="range-box mt-5">
                        <h5 className="fw-bold">NSFWQI Ranges</h5>
                        <ul className="list-group">
                            <li className="list-group-item green">90 – 100 → Excellent</li>
                            <li className="list-group-item blue">70 – 90 → Good</li>
                            <li className="list-group-item yellow">50 – 70 → Medium</li>
                            <li className="list-group-item orange">25 – 50 → Poor</li>
                            <li className="list-group-item red">0 – 25 → Very Poor</li>
                        </ul>
                    </div>
                </div>
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

export default NFSWQI;