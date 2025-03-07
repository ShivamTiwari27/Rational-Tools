import React, { useState } from 'react';
import './Wqi.css';

function WQI() {
  const [ph, setPh] = useState('');
  const [alkalinity, setAlkalinity] = useState('');
  const [iron, setIron] = useState('');
  const [tds, setTds] = useState('');
  const [chloride, setChloride] = useState('');
  const [conductivity, setConductivity] = useState('');
  const [waterQualityIndex, setWaterQualityIndex] = useState('');

  const weights = {
    ph: 0.12,
    alkalinity: 0.10,
    iron: 0.08,
    tds: 0.25,
    chloride: 0.15,
    conductivity: 0.30,
  };

  const standardValues = {
    ph: 8.5,
    alkalinity: 120,
    iron: 0.3,
    tds: 1000,
    chloride: 250,
    conductivity: 300,
  };

  const idealValues = {
    ph: 7,
    alkalinity: 0,
    iron: 0,
    tds: 0,
    chloride: 0,
    conductivity: 0,
  };

  const calculateSubindex = (value, parameter) => {
    return ((value - idealValues[parameter]) / (standardValues[parameter] - idealValues[parameter])) * 100;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phValue = parseFloat(ph);
    const alkalinityValue = parseFloat(alkalinity);
    const ironValue = parseFloat(iron);
    const tdsValue = parseFloat(tds);
    const chlorideValue = parseFloat(chloride);
    const conductivityValue = parseFloat(conductivity);


    const phSubindex = calculateSubindex(phValue, 'ph');
    const alkalinitySubindex = calculateSubindex(alkalinityValue, 'alkalinity');
    const ironSubindex = calculateSubindex(ironValue, 'iron');
    const tdsSubindex = calculateSubindex(tdsValue, 'tds');
    const chlorideSubindex = calculateSubindex(chlorideValue, 'chloride');
    const conductivitySubindex = calculateSubindex(conductivityValue, 'conductivity');

    const wqi = (
      (phSubindex * weights.ph) +
      (alkalinitySubindex * weights.alkalinity) +
      (ironSubindex * weights.iron) +
      (tdsSubindex * weights.tds) +
      (chlorideSubindex * weights.chloride) +
      (conductivitySubindex * weights.conductivity)
    ) / Object.values(weights).reduce((acc, curr) => acc + curr, 0);

    setWaterQualityIndex(wqi < 0 ? 0 : wqi); // Ensure WQI is not negative
  };

  const handleReset = () => {
    setPh('');
    setAlkalinity('');
    setIron('');
    setTds('');
    setChloride('');
    setConductivity('');
    setWaterQualityIndex('');
  };


  return (
    <div className="WQI">
      <h1>Water Quality Index (WQI) Calculator</h1>
      <p>
        An index value is calculated for each of five water quality parameters:
        temperature, biological oxygen demand (BOD), total suspended sediment
        (TSS), dissolved oxygen (DO), and conductivity. A higher value of each
        index indicates better water quality. The ISQA is calculated as the
        temperature index times the sum of the other four index values.
      </p>
      <a href="https://www.researchgate.net/publication/268290655_Generation_of_Groundwater_Quality_Index_Map_-_A_Case_Study" className="learn-more" target="_blank">
        Click here to learn more about the ISQA and the five water quality parameters used to compute it.
      </a>

      <form onSubmit={handleSubmit} className="parameter-form">

        <div className="parameter">
          <label htmlFor="ph">pH</label>
          <input
            type="number"
            id="ph"
            className="param-input"
            placeholder="pH"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
          />
          <div className="parameter-range">
            <span className="min">0</span>
            <span className="max">14</span>
          </div>
        </div>

        <div className="parameter">
          <label htmlFor="Alkalinity">Alkalinity (mg/L)</label>
          <input
            type="number"
            id="Alkalinity"
            className="param-input"
            placeholder="Total Alkalinity"
            value={alkalinity}
            onChange={(e) => setAlkalinity(e.target.value)}
          />
          <div className="parameter-range">
            <span className="min">0 mg/L</span>
            <span className="max">120 mg/L</span>
          </div>
        </div>

        <div className="parameter">
          <label htmlFor="TDS">TDS (mg/L)</label>
          <input
            type="number"
            id="TDS"
            className="param-input"
            placeholder="Total Dissolved Solids"
            value={tds}
            onChange={(e) => setTds(e.target.value)}
          />
          <div className="parameter-range">
            <span className="min">0 mg/L</span>
            <span className="max">1000 mg/L</span>
          </div>
        </div>

        <div className="parameter">
          <label htmlFor="Chloride">Chloride (mg/L)</label>
          <input
            type="number"
            id="Chloride"
            className="param-input"
            placeholder="Chloride"
            value={chloride}
            onChange={(e) => setChloride(e.target.value)}
          />
          <div className="parameter-range">
            <span className="min">0 mg/L</span>
            <span className="max">250 mg/L</span>
          </div>
        </div>


        <div className="parameter">
          <label htmlFor="Iron">Iron (mg/L)</label>
          <input
            type="number"
            id="Iron"
            className="param-input"
            placeholder="Iron"
            value={iron}
            onChange={(e) => setIron(e.target.value)}
          />
          <div className="parameter-range">
            <span className="min">0 mg/L</span>
            <span className="max">0.3 mg/L</span>
          </div>
        </div>

        <div className="parameter">
          <label htmlFor="Conductivity">Conductivity (umhos/cm)</label>
          <input
            type="number"
            id="Conductivity"
            className="param-input"
            placeholder="Conductivity"
            value={conductivity}
            onChange={(e) => setConductivity(e.target.value)}
          />
          <div className="parameter-range">
            <span className="min">0 uS</span>
            <span className="max">300 uS</span>
          </div>
        </div>

        {/* Similar input fields for other parameters */}
        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Submit
          </button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </form>
      <div className="water-quality-index">
        Simple Water Quality Index: <span>{waterQualityIndex}</span>
      </div>

      <div className="quality-levels">
        <div className="quality-level excellent">
          <div className="quality-level-box"></div>
          <span>unsuitable for drinking ( greater than 100)</span>
        </div>
        <div className="quality-level good">
          <div className="quality-level-box"></div>
          <span>Very Poor (75-100)</span>
        </div>
        <div className="quality-level average">
          <div className="quality-level-box"></div>
          <span>Poor (51-75)</span>
        </div>
        <div className="quality-level fair">
          <div className="quality-level-box"></div>
          <span>Good (26-50)</span>
        </div>
        <div className="quality-level poor">
          <div className="quality-level-box"></div>
          <span>Excellent (0-25)</span>
        </div>
      </div>


    </div>
  );
};

export default WQI;
