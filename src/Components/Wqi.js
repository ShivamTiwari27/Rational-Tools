import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Wqi.css';

function WQI() {
  const [ph, setPh] = useState('');
  const [alkalinity, setAlkalinity] = useState('');
  const [tds, setTds] = useState('');
  const [chloride, setChloride] = useState('');
  const [conductivity, setConductivity] = useState('');
  const [totalHardness, setTotalHardness] = useState('');
  const [DO, setDO] = useState('');
  const [Ca, setCa] = useState('');
  const [Mg, setMg] = useState('');
  const [BOD, setBOD] = useState('');
  const [Nitrate, setNitrate] = useState('');
  const [waterQualityIndex, setWaterQualityIndex] = useState('');


  const navigate = useNavigate();

  const weights = {
    ph: 0.1947,
    alkalinity: 0.0083,
    conductivity: 0.005517,
    totalhardness: 0.0055,
    DO: 0.3310,
    Ca: 0.02207,
    Mg: 0.0552,
    BOD: 0.3310,
    Nitrate: 0.0368,
    tds: 0.00331,
    chloride: 0.00662
  };


  const standardValues = {
    ph: 8.5,              // WHO & BIS: Acceptable range is 6.5 - 8.5  
    alkalinity: 200,      // BIS: 200 mg/L (acceptable), 600 mg/L (permissible)  
    tds: 500,             // WHO & BIS: 500 mg/L (acceptable), 2000 mg/L (permissible)  
    chloride: 250,        // WHO & BIS: 250 mg/L (taste threshold), 1000 mg/L (upper limit)  
    conductivity: 300,    // EPA: 1000 µS/cm (safe limit for drinking water)  
    totalhardness: 300,
    DO: 5,
    Ca: 75,
    Mg: 30,
    BOD: 10,
    Nitrate: 45,
  };


  const idealValues = {

    ph: 7.0,             // Neutral pH (ideal for drinking water)  
    alkalinity: 100,     // Minimum required for buffering capacity  
    tds: 150,            // Extremely pure water (WHO: 50 mg/L is excellent)  
    chloride: 50,       // Natural fresh water has low chloride levels  
    conductivity: 250,  // Low conductivity in natural fresh water  
    totalhardness: 100,
    DO: 7,
    Ca: 40,
    Mg: 20,
    BOD: 1,
    Nitrate: 10,
  };


  // const calculateSubindex = (value, parameter) => {
  //   return ((value - idealValues[parameter]) / (standardValues[parameter] - idealValues[parameter])) * 100;
  // };

  const calculateSubindex = (value, parameter) => {
    if (!value || isNaN(value)) return 0; // Handle invalid inputs
    return (value / standardValues[parameter]) * 100; // Correct sub-index formula
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Parsing input values
    const phValue = parseFloat(ph);
    const alkalinityValue = parseFloat(alkalinity);
    const tdsValue = parseFloat(tds);
    const chlorideValue = parseFloat(chloride);
    const conductivityValue = parseFloat(conductivity);
    const totalHardnessValue = parseFloat(totalHardness);
    const DOValue = parseFloat(DO);
    const CaValue = parseFloat(Ca);
    const MgValue = parseFloat(Mg);
    const BODValue = parseFloat(BOD);
    const NitrateValue = parseFloat(Nitrate);

    // Calculating subindexes for each parameter
    const phSubindex = calculateSubindex(phValue, 'ph');
    const alkalinitySubindex = calculateSubindex(alkalinityValue, 'alkalinity');
    const tdsSubindex = calculateSubindex(tdsValue, 'tds');
    const chlorideSubindex = calculateSubindex(chlorideValue, 'chloride');
    const conductivitySubindex = calculateSubindex(conductivityValue, 'conductivity');
    const totalHardnessSubindex = calculateSubindex(totalHardnessValue, 'totalHardness');
    const DOSubindex = calculateSubindex(DOValue, 'DO');
    const CaSubindex = calculateSubindex(CaValue, 'Ca');
    const MgSubindex = calculateSubindex(MgValue, 'Mg');
    const BODSubindex = calculateSubindex(BODValue, 'BOD');
    const nitrateSubindex = calculateSubindex(NitrateValue, 'Nitrate');

    // Calculating the Water Quality Index (WQI)
    const wqi = (
      (phSubindex * weights.ph) +
      (alkalinitySubindex * weights.alkalinity) +
      (tdsSubindex * weights.tds) +
      (chlorideSubindex * weights.chloride) +
      (conductivitySubindex * weights.conductivity) +
      (totalHardnessSubindex * weights.totalHardness) +
      (DOSubindex * weights.DO) +
      (CaSubindex * weights.Ca) +
      (MgSubindex * weights.Mg) +
      (BODSubindex * weights.BOD) +
      (nitrateSubindex * weights.Nitrate)
    ) / Object.values(weights).reduce((acc, curr) => acc + curr, 0);

    // Ensure WQI is not negative
    setWaterQualityIndex(wqi < 0 ? 0 : wqi);
  };



  const handleReset = () => {
    setPh('');
    setAlkalinity('');
    setTds('');
    setChloride('');
    setConductivity('');
    setTotalHardness('');
    setDO('');
    setCa('');
    setMg('');
    setBOD('');
    setNitrate('');
    setWaterQualityIndex('');
  };

  return (
    <div className="container py-3 WQI">
      <div className="card shadow-lg p-5 rounded">
        <h1 className="text-center text-primary fw-bold mb-4"> Weighted Arithmetic Water Quality Index (WA-WQI) Calculator</h1>
        <p className="text-muted text-center mb-4 lead">
          The Water Quality Index (WQI) is calculated based on multiple key water quality parameters, including pH, Alkalinity, Conductivity, Total Hardness, Dissolved Oxygen (DO), Ca (Ca), Mg (Mg), Biological Oxygen Demand (BOD), Nitrate, Total Dissolved Solids (TDS), and Chloride.
          Higher WQI values indicate better water quality. The overall WQI is computed using the weighted contribution of each parameter based on its significance and acceptable range.
        </p>

        <div className="text-center mb-4">
          <a href="https://www.researchgate.net/publication/268290655_Generation_of_Groundwater_Quality_Index_Map_-_A_Case_Study" className="btn btn-info text-white fw-bold" target="_blank">
            Learn More about Water Quality Parameters
          </a>
        </div>
        <div className="text-center mb-4">
          <a href="https://www.researchgate.net/figure/BIS-standards-and-unit-weights-W-n-of-studied-water-quality-parameters_tbl2_332401206" className="btn btn-info text-white fw-bold" target="_blank">
            BIS Standards
          </a>
        </div>

        <form onSubmit={handleSubmit} className="row g-4">
          {/* pH */}
          <div className="col-md-6">
            <div className="card shadow-sm p-3 border-0 bg-light">
              <label htmlFor="ph" className="form-label fw-bold text-primary">pH</label>
              <input
                type="number"
                id="ph"
                className="form-control"
                placeholder="Enter pH value"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
                min="0"
                max="14"
              />
              <div className="d-flex justify-content-between text-muted mt-1">
                <span className="small">0</span>
                <span className="small">14</span>
              </div>
            </div>
          </div>

          {/* Alkalinity */}
          <div className="col-md-6">
            <div className="card shadow-sm p-3 border-0 bg-light">
              <label htmlFor="alkalinity" className="form-label fw-bold text-success">Alkalinity (mg/L)</label>
              <input
                type="number"
                id="alkalinity"
                className="form-control"
                placeholder="Total Alkalinity"
                value={alkalinity}
                onChange={(e) => setAlkalinity(e.target.value)}
                min="0"
                max="200"
              />
              <div className="d-flex justify-content-between text-muted mt-1">
                <span className="small">0 mg/L</span>
                <span className="small">200 mg/L</span>
              </div>
            </div>
          </div>

          {/* TDS */}
          <div className="col-md-6">
            <div className="card shadow-sm p-3 border-0 bg-light">
              <label htmlFor="tds" className="form-label fw-bold text-danger">TDS (mg/L)</label>
              <input
                type="number"
                id="tds"
                className="form-control"
                placeholder="Total Dissolved Solids"
                value={tds}
                onChange={(e) => setTds(e.target.value)}
                min="0"
                max="500"
              />
              <div className="d-flex justify-content-between text-muted mt-1">
                <span className="small">0 mg/L</span>
                <span className="small">500 mg/L</span>
              </div>
            </div>
          </div>

          {/* Chloride */}
          <div className="col-md-6">
            <div className="card shadow-sm p-3 border-0 bg-light">
              <label htmlFor="chloride" className="form-label fw-bold text-warning">Chloride (mg/L)</label>
              <input
                type="number"
                id="chloride"
                className="form-control"
                placeholder="Chloride"
                value={chloride}
                onChange={(e) => setChloride(e.target.value)}
                min="0"
                max="250"
              />
              <div className="d-flex justify-content-between text-muted mt-1">
                <span className="small">0 mg/L</span>
                <span className="small">250 mg/L</span>
              </div>
            </div>
          </div>

          {/* Conductivity */}
          <div className="col-md-6">
            <div className="card shadow-sm p-3 border-0 bg-light">
              <label htmlFor="conductivity" className="form-label fw-bold text-info">Conductivity (µS/cm)</label>
              <input
                type="number"
                id="conductivity"
                className="form-control"
                placeholder="Conductivity"
                value={conductivity}
                onChange={(e) => setConductivity(e.target.value)}
                min="0"
                max="300"
              />
              <div className="d-flex justify-content-between text-muted mt-1">
                <span className="small">0 µS</span>
                <span className="small">300 µS</span>
              </div>
            </div>
          </div>

          {/* Total Hardness */}
          <div className="col-md-6">
            <div className="card shadow-sm p-3 border-0 bg-light">
              <label htmlFor="totalHardness" className="form-label fw-bold text-dark">Total Hardness (mg/L)</label>
              <input
                type="number"
                id="totalHardness"
                className="form-control"
                placeholder="Hardness"
                value={totalHardness}
                onChange={(e) => setTotalHardness(e.target.value)}
                min="0"
                max="300"
              />
              <div className="d-flex justify-content-between text-muted mt-1">
                <span className="small">0 mg/L</span>
                <span className="small">300 mg/L</span>
              </div>
            </div>
          </div>

          {/* DO */}
          <div className="col-md-6">
            <div className="card shadow-sm p-3 border-0 bg-light">
              <label htmlFor="DO" className="form-label fw-bold text-success">DO (mg/L)</label>
              <input
                type="number"
                id="DO"
                placeholder="Dissolved Oxygen"
                className="form-control"
                value={DO}
                onChange={(e) => setDO(e.target.value)}
                min="0"
                max="5"
              />
              <div className="d-flex justify-content-between text-muted mt-1">
                <span className="small">0</span>
                <span className="small">10</span>
              </div>
            </div>
          </div>

          {/* Ca */}
          <div className="col-md-6">
            <div className="card shadow-sm p-3 border-0 bg-light">
              <label htmlFor="Ca" className="form-label fw-bold text-warning">Calcium (mg/L)</label>
              <input
                type="number"
                id="Ca"
                className="form-control"
                placeholder='Calcium'
                value={Ca}
                onChange={(e) => setCa(e.target.value)}
                min="0"
                max="75"
              />

              <div className="d-flex justify-content-between text-muted mt-1">
                <span className="small">0 mg/L</span>
                <span className="small">75 mg/L</span>
              </div>
            </div>
          </div>

          {/* Mg */}
          <div className="col-md-6">
            <div className="card shadow-sm p-3 border-0 bg-light">
              <label htmlFor="Mg" className="form-label fw-bold text-secondary">Magnesium (mg/L)</label>
              <input
                type="number"
                id="Mg"
                className="form-control"
                placeholder='Magnesium'
                value={Mg}
                onChange={(e) => setMg(e.target.value)}
                min="0"
                max="30"
              />
              <div className="d-flex justify-content-between text-muted mt-1">
                <span className="small">0 mg/L</span>
                <span className="small">30 mg/L</span>
              </div>
            </div>
          </div>

          {/* BOD */}
          <div className="col-md-6">
            <div className="card shadow-sm p-3 border-0 bg-light">
              <label htmlFor="BOD" className="form-label fw-bold text-primary">BOD (mg/L)</label>
              <input
                type="number"
                id="BOD"
                placeholder='BOD'
                className="form-control"
                value={BOD}
                onChange={(e) => setBOD(e.target.value)}
                min="0"
                max="10"
              />
              <div className="d-flex justify-content-between text-muted mt-1">
                <span className="small">0 mg/L</span>
                <span className="small">10 mg/L</span>
              </div>
            </div>
          </div>

          <div className="col-md-6 nitrate-container">
            <div className="card shadow-sm p-3 border-0 bg-light">
              <label htmlFor="Nitrate" className="form-label fw-bold text-dark">
                Nitrate (mg/L)
              </label>
              <input
                type="number"
                id="Nitrate"
                className="form-control"
                placeholder='Nitrate'
                value={Nitrate}
                onChange={(e) => setNitrate(e.target.value)}
                min="0"
                max="10"
              />
              <div className="d-flex justify-content-between text-muted mt-1">
                <span className="small">0 mg/L</span>
                <span className="small">10 mg/L</span>
              </div>
            </div>
          </div>


          {/* Buttons */}
          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary me-2">Submit</button>
            <button type="button" onClick={handleReset} className="btn btn-secondary">Reset</button>
          </div>
        </form>

        <div className="container mt-4">
          {/* Water Quality Index Display */}
          <div
            className={`alert ${waterQualityIndex > 100
              ? 'alert-danger'
              : waterQualityIndex > 75
                ? 'alert-warning'
                : waterQualityIndex > 51
                  ? 'alert-info'
                  : waterQualityIndex > 26
                    ? 'alert-success'
                    : 'alert-primary'
              } fw-bold text-center`}
          >
            Simple Water Quality Index: <span>{waterQualityIndex ? waterQualityIndex.toFixed(2) : 'N/A'}</span>
          </div>

          {/* Quality Levels */}
          <div className="card shadow-lg border-0">
            <div className="card-BODy">
              <h5 className="card-title fw-bold mb-3">Quality Levels:</h5>
              <div className="row g-2">
                {/* Unsuitable for Drinking */}
                <div className="col-12">
                  <div className="d-flex align-items-center p-2 bg-danger text-white rounded">
                    <div className="me-3" style={{ width: "20px", height: "20px", backgroundColor: "#dc3545" }}></div>
                    <span>Unsuitable for drinking (greater than 100)</span>
                  </div>
                </div>

                {/* Very Poor */}
                <div className="col-12">
                  <div className="d-flex align-items-center p-2 bg-warning text-dark rounded">
                    <div className="me-3" style={{ width: "20px", height: "20px", backgroundColor: "#ffc107" }}></div>
                    <span>Very Poor (75-100)</span>
                  </div>
                </div>

                {/* Poor */}
                <div className="col-12">
                  <div className="d-flex align-items-center p-2 bg-info text-white rounded">
                    <div className="me-3" style={{ width: "20px", height: "20px", backgroundColor: "#17a2b8" }}></div>
                    <span>Poor (51-75)</span>
                  </div>
                </div>

                {/* Good */}
                <div className="col-12">
                  <div className="d-flex align-items-center p-2 bg-success text-white rounded">
                    <div className="me-3" style={{ width: "20px", height: "20px", backgroundColor: "#28a745" }}></div>
                    <span>Good (26-50)</span>
                  </div>
                </div>

                {/* Excellent */}
                <div className="col-12">
                  <div className="d-flex align-items-center p-2 bg-primary text-white rounded">
                    <div className="me-3" style={{ width: "20px", height: "20px", backgroundColor: "#007bff" }}></div>
                    <span>Excellent (0-25)</span>
                  </div>
                </div>
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

      </div>
    </div>
  );
};

export default WQI;
