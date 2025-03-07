
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HydroTools.css';

function HydroTools() {
    const [intensity, setIntensity] = useState('');
    const [area, setArea] = useState('');
    const [areaUnit, setAreaUnit] = useState('square meter');
    const [intensityUnit, setIntensityUnit] = useState('mm/hour');
    const [runoffCoefficient, setRunoffCoefficient] = useState('0.05 - 0.35');
    const [useCustomCoefficient, setUseCustomCoefficient] = useState(false);
    const [customCoefficient, setCustomCoefficient] = useState('');
    const [result, setResult] = useState(null);

    const [numDistinctLands, setNumDistinctLands] = useState(0);
    const [runoffCoefficients, setRunoffCoefficients] = useState([]);
    const [areas, setAreas] = useState([]);
    const [weightedCoefficient, setWeightedCoefficient] = useState(null);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        let areaInSquareMeter = area;
        switch (areaUnit) {
            case 'acre':
                areaInSquareMeter = area * 4046.86;
                break;
            case 'hectare':
                areaInSquareMeter = area * 10000;
                break;
            case 'square kilometer':
                areaInSquareMeter = area * 1000000;
                break;
            case 'square feet':
                areaInSquareMeter = area * 0.092903;
                break;
            default:
                break;
        }

        let intensityInMMPerHour = intensity;
        switch (intensityUnit) {
            case 'inch/hour':
                intensityInMMPerHour *= 25.4;
                break;
            case 'inch/day':
                intensityInMMPerHour *= 25.4 * 24;
                break;
            case 'inch/year':
                intensityInMMPerHour *= 25.4 * 24 * 365;
                break;
            case 'mm/day':
                intensityInMMPerHour *= 24;
                break;
            case 'mm/year':
                intensityInMMPerHour *= 24 * 365;
                break;
            default:
                break;
        }

        const c = useCustomCoefficient ? parseFloat(customCoefficient) : parseFloat(runoffCoefficient.split(' - ')[0]);
        const q = c * intensityInMMPerHour * areaInSquareMeter;
        setResult(q);
    };

    const handleToggleCustomCoefficient = (e) => {
        setUseCustomCoefficient(e.target.checked);
    };

    const handleReset = () => {
        setIntensity('');
        setArea('');
        setAreaUnit('square meter');
        setIntensityUnit('mm/hour');
        setRunoffCoefficient('0.05 - 0.35');
        setUseCustomCoefficient(false);
        setCustomCoefficient('');
        setResult(null);

        setNumDistinctLands(0);
        setRunoffCoefficients([]);
        setAreas([]);
        setWeightedCoefficient(null);
    };

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


    return (
        <div className="hydro-tools-container">
            <h2 className="hydro-tool-title text-center mt-5 mb-5">
                <span className="hydro-text-primary">Rational Equation Calculator</span>
            </h2>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="intensity" className="form-label fw-bold">Intensity:</label>
                                            <div className="input-group">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="intensity"
                                                    value={intensity}
                                                    onChange={(e) => setIntensity(e.target.value)}
                                                    placeholder="Enter intensity"
                                                    required
                                                />
                                                <select
                                                    className="form-select"
                                                    value={intensityUnit}
                                                    onChange={(e) => setIntensityUnit(e.target.value)}
                                                >
                                                    <option value="mm/hour">mm/hour</option>
                                                    <option value="inch/hour">inch/hour</option>
                                                    <option value="inch/day">inch/day</option>
                                                    <option value="inch/year">inch/year</option>
                                                    <option value="mm/day">mm/day</option>
                                                    <option value="mm/year">mm/year</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="area" className="form-label fw-bold">Area:</label>
                                            <div className="input-group">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="area"
                                                    value={area}
                                                    onChange={(e) => setArea(e.target.value)}
                                                    placeholder="Enter area"
                                                    required
                                                />
                                                <select
                                                    className="form-select"
                                                    value={areaUnit}
                                                    onChange={(e) => setAreaUnit(e.target.value)}
                                                >
                                                    <option value="square meter">Square Meter</option>
                                                    <option value="acre">Acre</option>
                                                    <option value="hectare">Hectare</option>
                                                    <option value="square kilometer">Square Kilometer</option>
                                                    <option value="square feet">Square Feet</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="useCustomCoefficient"
                                            checked={useCustomCoefficient}
                                            onChange={handleToggleCustomCoefficient}
                                        />
                                        <label className="form-check-label fw-bold" htmlFor="useCustomCoefficient">Use Custom Coefficient:</label>
                                    </div>
                                    {useCustomCoefficient ? (
                                        <div className="mb-3">
                                            <label htmlFor="customCoefficient" className="form-label fw-bold">Custom Coefficient (C):</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="customCoefficient"
                                                value={customCoefficient}
                                                onChange={(e) => setCustomCoefficient(e.target.value)}
                                                placeholder="Enter custom coefficient"
                                                required
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label htmlFor="runoffCoefficient" className="form-label fw-bold">Calculated Value of Composite Runoff Coefficient:</label>
                                            {/* <select
                                                className="form-select"
                                                value={runoffCoefficient}
                                                onChange={(e) => setRunoffCoefficient(e.target.value)}
                                            >
                                                <option value="0.05 - 0.35">Lawns: 0.05 - 0.35</option>
                                                <option value="0.05 - 0.25">Forest: 0.05 - 0.25</option>
                                                <option value="0.08 - 0.41">Cultivated land: 0.08 - 0.41</option>
                                                <option value="0.1 - 0.5">Meadow: 0.1 - 0.5</option>
                                                <option value="0.1 - 0.25">Parks, cemeteries: 0.1 - 0.25</option>
                                                <option value="0.1 - 0.3">Unimproved areas: 0.1 - 0.3</option>
                                                <option value="0.12 - 0.62">Pasture: 0.12 - 0.62</option>
                                                <option value="0.3 - 0.75">Residential areas: 0.3 - 0.75</option>
                                                <option value="0.5 - 0.95">Business areas: 0.5 - 0.95</option>
                                                <option value="0.5 - 0.9">Industrial areas: 0.5 - 0.9</option>
                                                <option value="0.7 - 0.95">Asphalt streets: 0.7 - 0.95</option>
                                                <option value="0.7 - 0.85">Brick streets: 0.7 - 0.85</option>
                                                <option value="0.75 - 0.95">Roofs: 0.75 - 0.95</option>
                                                <option value="0.7 - 0.95">Concrete streets: 0.7 - 0.95</option>
                                            </select> */}

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
                                        </div>
                                    )}
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary me-3">Calculate Q</button>
                                        <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
                                    </div>
                                </form>
                                {result && (
                                    <div className="mt-4">
                                        <h2 className="text-center">Q = {result.toFixed(2)} cfs</h2>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="card bg-light shadow mt-5">
                            <div className='card-body'>
                                <h2 className="mb-3">Rational Method Equation</h2>
                                <p><strong>Applicability</strong>: The Rational Method establishes an empirical formula that is commonly used in urban
                                    areas for computing peak rates of runoff for designing drainage structures. It is useful in estimating runoff
                                    on relatively small areas such as roof tops and parking lots. Use of the rational equation should be limited
                                    to drainage areas less than 20 acres (Amer. Public Works Assn., 1974) with generally uniform cover type
                                    and grade. Required output = peak discharge only.Drainage area {'<'} 20 acres.</p>

                                <p><strong>Description of Method:</strong> The Rational Method is used for determining peak discharges from small
                                    drainage areas. This method is traditionally used to size storm sewers, channels, and other stormwater
                                    structures which handle runoff from drainage areas less than 20 acres.</p>

                                <p><strong>Rational Equation:</strong> Q = CiA</p>
                                <p>The Rational equation requires the following units:</p>
                                <ul>
                                    <li>Q = Peak rate of runoff in cubic feet per second (cfs)</li>
                                    <li>C = Runoff coefficient, an empirical coefficient representing a relationship between rainfall and runoff</li>
                                    <li>i = Average intensity of rainfall in inches per hour for the time of concentration (Tc) for a selected
                                        frequency of occurrence or return period. </li>
                                    <li>A = The watershed area in acres </li>
                                    <li> Tc =The rainfall intensity averaging time in minutes, usually referred to as the time of concentration, equal
                                        to the time required for water to flow from the hydraulically most distant point in the watershed to the point
                                        of design. </li>
                                </ul>
                                <p>unit is in cfs.</p>

                                <p><strong>  Assumptions: </strong> The peak rate of runoff at any point is a direct function of the tributary drainage area and
                                    the average rainfall intensity during the time of concentration to that point based on the following: </p>
                                <ul>
                                    <li>The return period of the peak discharge rate is the same as the return period of the average rainfall
                                        intensity or rainfall event. While watershed-related variations such as antecedent moisture conditions
                                        may cause this relationship to break down, this assumption is widely used in methodologies for
                                        estimating peak flows or hydrographs.</li>
                                    <li>The rainfall is uniformly distributed over the watershed. Whether this assumption is true depends
                                        upon the size of the watershed and the rainfall event. </li>
                                    <li>The rainfall intensity remains constant during the time period equal to Tc. Based on rainfall records,
                                        this assumption is true for short periods of time (a few minutes), but becomes less true as time
                                        increases. In turn, this assumption has led to a common misconception that the duration of the storm
                                        is equal to Tc. This is theoretically possible but it is much more common for the total storm duration to
                                        be considerably longer than Tc. Of equal importance is the concept that Tc (the rainfall intensity
                                        averaging time) can occur during any segment of the total storm duration; at the beginning, before,
                                        during or after the middle portion; or near the end. This concept has important implications for the
                                        runoff coefficient C and how well the Rational Formula mirrors the hydrologic cycle. If an intensity for
                                        a duration that is equal to or slightly greater than Tc occurs at the beginning of the storm, then the
                                        antecedent moisture conditions become important. If Tc occurs near the end of a long storm, then the
                                        ground may be saturated and depression storage already filled when Tc begins.</li>
                                    <li>The relationship between rainfall and runoff is linear. If rainfall is doubled then runoff is doubled. This
                                        is not accurate because of all the variables which interact and determine runoff. In fact, one of the
                                        major misconceptions on the use of the formula is that each of the variables (C, i, A) is independent
                                        and estimated separately. In reality, there is some interdependency among variables; however, the
                                        aids used in estimating the variables do not recognize such a relationship.  </li>
                                    <li> The runoff coefficient, C, is constant for storms of any duration or frequency on the watershed. This is
                                        a major misconception of many who use the Rational Formula. C is a variable and during the design
                                        of a stormwater system, especially a storm sewer, it should take on several different values for the
                                        various segments even though the land use remains the same.  </li>
                                </ul>



                                <p><strong>  Limitations: </strong> The Rational Formula only produces one point on the runoff hydrograph, the peak discharge
                                    rate. Where a hydrograph is required, other methods must be used. </p>
                                <ul>
                                    <li>When basins become complex, and where sub-basins combine, the Rational Formula will tend to
                                        overestimate the actual flow. The overestimation will result in the oversizing of stormwater
                                        management systems. For this reason, the formula should not be used for larger developments as a
                                        basis for establishing predevelopment flow rates, which are used to define the restrictions needed for
                                        peak rate control.</li>
                                    <li>The artificially high estimates could result in release rates higher than existing conditions, resulting in
                                        adverse effects downstream. </li>
                                    <li>The method assumes that the rainfall intensity is uniform over the entire watershed. This assumption
                                        is true only for small watersheds and time periods, thus limiting the use of the formula to small
                                        watersheds. </li>
                                    <li>The results of using the formula are frequently not replicable from user to user. There are
                                        considerable variations in interpretation and methodology in the use of the formula. The simplistic
                                        approach of the formula permits, and in fact, requires a wide latitude of subjective judgment in its
                                        application. </li>
                                    <li> Average rainfall intensities used in the method bear no time sequence relation to the actual rainfall
                                        pattern during a storm. The intensity-duration-frequency curves prepared by the Weather Bureau are
                                        not time sequence curves of precipitation. The maxima of the several durations as used in the
                                        method are not necessarily in their original sequential order; and the resulting tabulations of maxima
                                        ordered by size or duration may bear little resemblance to the original storm pattern. In many, if not
                                        most, cases, the intensities on the same frequency curve for various durations are not from the same
                                        storm.  </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default HydroTools;

