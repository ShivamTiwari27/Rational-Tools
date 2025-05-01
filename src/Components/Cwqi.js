import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './cwqi.css';

const standards = {
    ph: 8.5,
    tds: 500,
    chloride: 250,
    conductivity: 300,
    bod: 5
};

const CWQI = () => {
    const [values, setValues] = useState({
        ph: '',
        tds: '',
        chloride: '',
        conductivity: '',
        bod: ''
    });

    const [cwqi, setCwqi] = useState(null);
    const [status, setStatus] = useState('');

    // Function to calculate F1, F2, F3 and CWQI
    const calculateCWQI = () => {
        const failedParams = Object.keys(values).filter(
            (param) => values[param] > standards[param]
        );

        const F1 = (failedParams.length / Object.keys(values).length) * 100;
        const totalTests = Object.keys(values).length;
        const failedTests = failedParams.length;
        const F2 = (failedTests / totalTests) * 100;

        // Calculate F3 using Excursions
        let sumExcursions = 0;
        failedParams.forEach((param) => {
            const excursion = values[param] / standards[param] - 1;
            sumExcursions += excursion;
        });

        const nse = sumExcursions / totalTests;
        const F3 = (nse / (0.01 * nse + 1)) * 100;

        // Final CWQI Calculation
        const cwqiValue = 100 - Math.sqrt((F1 ** 2 + F2 ** 2 + F3 ** 2) / 3);
        setCwqi(cwqiValue.toFixed(2));

        // Determine the status based on CWQI value
        if (cwqiValue >= 95) {
            setStatus('Excellent');
        } else if (cwqiValue >= 80) {
            setStatus('Good');
        } else if (cwqiValue >= 65) {
            setStatus('Fair');
        } else if (cwqiValue >= 45) {
            setStatus('Marginal');
        } else {
            setStatus('Poor');
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        calculateCWQI();
    };

    // Handle reset
    const handleReset = () => {
        setValues({
            ph: '',
            tds: '',
            chloride: '',
            conductivity: '',
            bod: ''
        });
        setCwqi(null);
        setStatus('');
    };

    const navigate = useNavigate();


    return (
        <div className="container mt-5">
            {/* Description */}

            <h1 className="text-center text-primary fw-bold mb-4">Canadian Water Quality Index (CWQI)</h1>
            <div className="card shadow-sm p-4 mb-4">
                <p className="text-muted">
                    The Canadian Water Quality Index (CWQI) is a tool used to evaluate water quality
                    based on multiple water quality parameters. It summarizes complex water quality data
                    into a single score ranging from 0 to 100.
                </p>
                <p className="text-muted">
                    The CWQI is calculated using three factors:
                </p>
                <ul className="text-muted">
                    <li><b>F1 (Scope):</b> Percentage of parameters that fail to meet the objective.</li>
                    <li><b>F2 (Frequency):</b> Percentage of failed tests over the total number of tests.</li>
                    <li><b>F3 (Amplitude):</b> Degree to which the failed tests exceed the objective.</li>
                </ul>
                <p className="text-muted">
                    More details can be found on the official website:
                    <a
                        href="https://www.researchgate.net/publication/337881191_Various_methods_for_calculating_the_water_quality_index"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ms-2"
                    >
                        Canadian Council of Ministers of the Environment (CCME)
                    </a>
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="row g-4">
                {Object.keys(values).map((param) => (
                    <div className="col-md-6" key={param}>
                        <div className="card shadow-sm p-3 border-0 bg-light">
                            <label className="form-label fw-bold text-primary text-capitalize">
                                {param} ({param === 'ph' ? '' : 'mg/L'})
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder={`Enter ${param} value`}
                                value={values[param]}
                                onChange={(e) =>
                                    setValues({ ...values, [param]: parseFloat(e.target.value) })
                                }
                                min="0"
                            />
                            <div className="d-flex justify-content-between text-muted mt-1">
                                <span className="small">0</span>
                                <span className="small">
                                    {standards[param]} {param !== 'ph' ? 'mg/L' : ''}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Buttons */}
                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-center gap-3">
                        <button type="submit" className="btn btn-primary px-4 py-2">
                            Calculate CWQI
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="btn btn-outline-secondary px-4 py-2"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </form>

            {/* Result */}
            {cwqi !== null && (
                <div className="result-container mt-5 text-center">
                    <h4>
                        Water Quality Index:
                        <span className={`result-badge ${status.toLowerCase()}`}>
                            {cwqi}
                        </span>
                    </h4>
                    <p className={`status-text ${status.toLowerCase()}`}>
                        Status: {status}
                    </p>
                </div>
            )}

            <div className="mt-5">
                <h5 className="text-center mb-3">Water Quality Ranges:</h5>
                <ul className="list-group text-center">
                    <li className="list-group-item d-flex justify-content-center align-items-center range-item green">

                        <span style={{ fontSize: '14px' }}>Excellent (95 - 100)</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-center align-items-center range-item blue">

                        <span style={{ fontSize: '14px' }}>Good (80 - 94)</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-center align-items-center range-item yellow">

                        <span style={{ fontSize: '14px' }}>Fair (65 - 79)</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-center align-items-center range-item orange">
                        <span style={{ fontSize: '14px' }}>Marginal (45 - 64)</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-center align-items-center range-item red">
                        <span style={{ fontSize: '14px' }}>Poor (0 - 44)</span>
                    </li>
                </ul>
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

export default CWQI;