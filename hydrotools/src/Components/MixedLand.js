import React, { useState } from 'react';

function CompositeRunoffCoefficient() {
    const [numDistinctLands, setNumDistinctLands] = useState(0);
    const [runoffCoefficients, setRunoffCoefficients] = useState([]);
    const [areas, setAreas] = useState([]);
    const [weightedCoefficient, setWeightedCoefficient] = useState(null);

    const handleNumDistinctLandsChange = (e) => {
        const count = parseInt(e.target.value);
        if (!isNaN(count) && count >= 1) {
            setNumDistinctLands(count);
            setRunoffCoefficients(Array(count).fill(0));
            setAreas(Array(count).fill(0));
            setWeightedCoefficient(null);
        }
    };

    const handleRunoffCoefficientChange = (index, value) => {
        const newValue = parseFloat(value);
        if (!isNaN(newValue) && newValue >= 0 && newValue <= 1) {
            const newCoefficients = [...runoffCoefficients];
            newCoefficients[index] = newValue;
            setRunoffCoefficients(newCoefficients);
        }
    };

    const handleAreaChange = (index, value) => {
        const newValue = parseFloat(value);
        const newAreas = [...areas];
        newAreas[index] = newValue;
        setAreas(newAreas);
    };

    const calculateWeightedCoefficient = () => {
        const totalArea = areas.reduce((acc, area) => acc + area, 0);
        const weightedCoefficient = runoffCoefficients.reduce((acc, coefficient, index) => {
            return acc + (coefficient * areas[index]);
        }, 0) / totalArea;
        setWeightedCoefficient(weightedCoefficient.toFixed(2));
    };

    const handleReset = () => {
        setNumDistinctLands(0);
        setRunoffCoefficients([]);
        setAreas([]);
        setWeightedCoefficient(null);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card bg-light shadow p-4">
                        <h2 className="mb-4">Composite Runoff Coefficient Calculator</h2>
                        <p>Mixed land use watersheds are more vulnerable to land use change, and even moderate forest-to-developed use conversions can significantly impact streamflow dynamics. Land use change is particularly influential in mixed land use watersheds, and integrated modeling can help predict future water resources.</p>
                        <p>Mixed land use refers to land used for a variety of purposes, such as residential, recreational, and public utility, and is mainly seen in urban areas. Water pathways and water contamination in mixed land-use catchments can be complex to understand because of the many runoff-generating sources and human-modified water pathways.</p>
                        <p>Some research on mixed land hydrology includes:</p>
                        <ul>
                            <li className="text-start">Land Use and Hydrology: <a href="https://scholar.google.co.in/scholar?q=Mixed+land+Hydrology&hl=en&as_sdt=0&as_vis=1&oi=scholart" target="_blank" rel="noopener noreferrer">More Information</a></li>
                            <li className="text-start">Cumulative Effects of Low Impact Development on Watershed Hydrology</li>
                            <li className="text-start">Hydrology, drought, soil moisture</li>
                            <li className="text-start">Hydrological connectivity dynamics in a mixed land use lowland catchment</li>
                        </ul>

                        <hr />
                        
                        <p className="text-start">The composite runoff coefficient is used for such areas and is calculated based on the runoff coefficients and areas of each land use.</p>
                        <p className="text-start">The formula for the composite runoff coefficient (Cw) is:</p>
                        <p className="text-start">
                            <strong>Cw = Σ(C<sub>j</sub> * A<sub>j</sub>) / ΣA<sub>j</sub></strong>
                        </p>
                        <p className="text-start">Where:</p>
                        <ul>
                            <li className="text-start">Cw = Weighted runoff coefficient</li>
                            <li className="text-start">C<sub>j</sub> = Runoff coefficient for area j (0 to 1)</li>
                            <li className="text-start">A<sub>j</sub> = Area for land cover j</li>
                        </ul>
                        <hr />
                        <h2 className="mb-4">Calculation Tool</h2>
                        <div className="mb-3">
                            <label>Number of distinct land uses:</label>
                            <input type="number" min="1" className="form-control" onChange={handleNumDistinctLandsChange} />
                        </div>
                        {numDistinctLands > 0 && (
                            <div>
                                {[...Array(numDistinctLands)].map((_, index) => (
                                    <div key={index}>
                                        <label>Runoff coefficient for area {index + 1} (0 to 1):</label>
                                        <input type="number" step="0.01" min="0" max="1" value={runoffCoefficients[index]} onChange={(e) => handleRunoffCoefficientChange(index, e.target.value)} className="form-control" />
                                        <label>Area for land cover {index + 1}:</label>
                                        <input type="number" value={areas[index]} onChange={(e) => handleAreaChange(index, e.target.value)} className="form-control" />
                                    </div>
                                ))}
                                <button onClick={calculateWeightedCoefficient} className="btn btn-primary mt-3">Calculate Weighted Coefficient</button>
                            </div>
                        )}
                        {weightedCoefficient !== null && (
                            <div className="mt-3">
                                <label>Weighted Runoff Coefficient (Cw):</label>
                                <span>{weightedCoefficient}</span>
                            </div>
                        )}
                        <button onClick={handleReset} className="btn btn-secondary mt-3">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompositeRunoffCoefficient;
