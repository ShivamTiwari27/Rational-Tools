import React, { useState } from 'react';
import Papa from 'papaparse';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const RMSECalculator = () => {
    const [data, setData] = useState({ x: [], y: [] });
    const [result, setResult] = useState(null);
    const [inputX, setInputX] = useState('');
    const [inputY, setInputY] = useState('');
    const [inputMethod, setInputMethod] = useState('manual');
    const [selectedMetric, setSelectedMetric] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'x') setInputX(value);
        else if (name === 'y') setInputY(value);
    };

    const handleAddData = () => {
        if (!inputX || !inputY) {
            setErrorMessage('Both X and Y values are required.');
            return;
        }
        setData(prevData => ({
            x: [...prevData.x, parseFloat(inputX)],
            y: [...prevData.y, parseFloat(inputY)],
        }));
        setInputX('');
        setInputY('');
        setErrorMessage('');
    };

    const handleInputMethodChange = (e) => {
        setInputMethod(e.target.value);
    };

    const calculateMetric = () => {
        const { x, y } = data;
        if (x.length !== y.length) {
            setResult(null);
            setErrorMessage('Number of X and Y values must be equal.');
            return;
        }
        switch (selectedMetric) {
            case 'mse':
                setResult(calculateMSE());
                break;
            case 'rmse':
                setResult(calculateRMSE());
                break;
            case 'rmsd':
                setResult(calculateRMSD());
                break;
            case 'meanbias':
                setResult(calculateMBE());
                break
            case 'r2':
                setResult(calculateRSquared());
                break;
            case 'kendalltau':
                setResult(calculateKendallsTau());
                break;
            case 'idx':
                setResult(calculateIndexOfAgreement());
                break
            case 'kling':
                setResult(calculateKlingGuptaEfficiency());
                break
            case 'deri':
                setResult(calculateDerivationOfGain());
                break
                // Add cases for other metrics
            default:
                setResult(null);
                break;
        }

        setErrorMessage('');

    };

    const calculateMSE = () => {
        const { x, y } = data;
        const n = x.length;
        let sumSquaredErrors = 0;
        for (let i = 0; i < n; i++) {
            const error = y[i] - x[i];
            sumSquaredErrors += Math.pow(error, 2);
        }
        const mse = sumSquaredErrors / n;
        return mse;
    };

    const calculateRMSE = () => {
        const { x, y } = data;
        const n = x.length;
        let sumSquaredErrors = 0;
        let minObserved = Infinity;
        let maxObserved = -Infinity;
        for (let i = 0; i < n; i++) {
            const error = y[i] - x[i];
            sumSquaredErrors += Math.pow(error, 2);
            if (y[i] < minObserved) minObserved = y[i];
            if (y[i] > maxObserved) maxObserved = y[i];
        }
        const rmse = Math.sqrt(sumSquaredErrors / n);
        return rmse
    };

    const calculateRMSD = () => {
        const mse = calculateMSE();
        const rmsd = Math.sqrt(mse);
        return rmsd;
    };

    const calculateMBE = () => {
        const { x, y } = data;
        const n = x.length;
        let sumBiasErrors = 0;
        for (let i = 0; i < n; i++) {
            sumBiasErrors += y[i] - x[i];
        }
        const mbe = sumBiasErrors / n;
        return mbe;
    };

    const calculateNRMSE = () => {
        const { x, y } = data;
        const n = x.length;
        let sumSquaredErrors = 0;
        let minObserved = Infinity;
        let maxObserved = -Infinity;
        for (let i = 0; i < n; i++) {
            const error = y[i] - x[i];
            sumSquaredErrors += Math.pow(error, 2);
            if (y[i] < minObserved) minObserved = y[i];
            if (y[i] > maxObserved) maxObserved = y[i];
        }

        const rmse = Math.sqrt(sumSquaredErrors / n);
        const range = maxObserved - minObserved;
        const nrmse = rmse / range;

        return nrmse;
    };

    const calculateRSquared = () => {
        const { x, y } = data;
        const n = x.length;
        let sumSquaredTotal = 0;
        let sumSquaredResiduals = 0;
        const meanY = y.reduce((acc, val) => acc + val, 0) / n;
        for (let i = 0; i < n; i++) {
            sumSquaredTotal += Math.pow(y[i] - meanY, 2);
            sumSquaredResiduals += Math.pow(y[i] - x[i], 2);
        }
        const rSquared = 1 - (sumSquaredResiduals / sumSquaredTotal);
        return rSquared;
    };

    const calculateRelativeBiasPercent = () => {
        const mbe = calculateMBE();
        const { x, y } = data;
        const n = x.length;
        const sumY = y.reduce((acc, val) => acc + val, 0);
        const relativeBiasPercent = (mbe / (sumY / n)) * 100;
        return relativeBiasPercent;
    };

    const calculateKendallsTau = () => {
        const { x, y } = data;
        let concordant = 0;
        let discordant = 0;
        const n = x.length;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if ((x[i] - x[j]) * (y[i] - y[j]) > 0) {
                    concordant++;
                } else if ((x[i] - x[j]) * (y[i] - y[j]) < 0) {
                    discordant++;
                }
            }
        }
        const kendallsTau = (concordant - discordant) / (n * (n - 1) / 2);
        return kendallsTau;
    };

    const calculateIndexOfAgreement = () => {
        const { x, y } = data;
        const n = x.length;
        const meanObserved = y.reduce((acc, val) => acc + val, 0) / n;
        let sumNumerator = 0;
        let sumDenominator = 0;
        for (let i = 0; i < n; i++) {
            sumNumerator += Math.pow(y[i] - x[i], 2);
            sumDenominator += Math.pow(Math.abs(y[i] - meanObserved) + Math.abs(x[i] - meanObserved), 2);
        }
        const indexAgreement = 1 - (sumNumerator / sumDenominator);
        return indexAgreement;
    };

    const calculateKlingGuptaEfficiency = () => {
        const { x, y } = data;
        const n = x.length;
        const meanObserved = y.reduce((acc, val) => acc + val, 0) / n;
        const meanSimulated = x.reduce((acc, val) => acc + val, 0) / n;
        const stdObserved = Math.sqrt(y.reduce((acc, val) => acc + Math.pow(val - meanObserved, 2), 0) / n);
        const stdSimulated = Math.sqrt(x.reduce((acc, val) => acc + Math.pow(val - meanSimulated, 2), 0) / n);
        let cov = 0;
        for (let i = 0; i < n; i++) {
            cov += (y[i] - meanObserved) * (x[i] - meanSimulated);
        }
        cov /= n;
        const kge = 1 - Math.sqrt(Math.pow((meanSimulated - meanObserved) / meanObserved, 2) +
            Math.pow((stdSimulated - stdObserved) / stdObserved, 2) +
            Math.pow((cov / (stdObserved * stdSimulated)), 2));
        return kge;
    };

    const calculateDerivationOfGain = () => {
        const { x, y } = data;
        const n = x.length;
        const maxObserved = Math.max(...y);
        const minObserved = Math.min(...y);
        const rangeObserved = maxObserved - minObserved;
        const maxSimulated = Math.max(...x);
        const minSimulated = Math.min(...x);
        const rangeSimulated = maxSimulated - minSimulated;
        let sum = 0;
        for (let i = 0; i < n; i++) {
            sum += Math.pow((y[i] - x[i]) / rangeObserved, 2);
        }
        const dG = 1 - Math.sqrt(sum / n);
        return dG;
    };








    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const contents = e.target.result;
            const rows = contents.split('\n');
            const x = [];
            const y = [];
            rows.forEach(row => {
                const values = row.split(',');
                if (values.length === 2) {
                    x.push(parseFloat(values[0]));
                    y.push(parseFloat(values[1]));
                }
            });
            setData({ x, y });
        };
        reader.readAsText(file);
    };

    const dataGraph = {
        labels: data.x,
        datasets: [
            {
                label: 'Observed',
                data: data.y,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
            {
                label: 'Predicted',
                data: data.x,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
            },
        ],
    };
    const handleReset = () => {
        setData({ x: [], y: [] });
        setResult(null);
        setInputX('');
        setInputY('');
        setErrorMessage('');
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = '';
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            {errorMessage && <p style={{ marginBottom: '10px', color: 'red' }}>{errorMessage}</p>}
            <div style={{ height: '400px', width: '600px', marginBottom: '20px' }}>
                <Line data={dataGraph} />
            </div>
            <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                style={{ marginBottom: '20px' }}
            >
                <option value="">Select Metric</option>
                <option value="mse">MSE</option>
                <option value="rmse">RMSE</option>
                <option value="rmsd">RMSD</option>
                <option value="meanbias">Mean Bias Error</option>
                <option value="r2">R Squared</option>
                <option value="kendalltau">Kendall's Tau</option>
                <option value="idx">Index of Agreement</option>
                <option value="kling">Kling Gupta Efficiency (KGE)</option>
                <option value="deri">Derivation of Gain</option>
            </select>
            {result && <p style={{ marginBottom: '20px' }}>Result: {result}</p>}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <select
                    value={inputMethod}
                    onChange={handleInputMethodChange}
                    style={{ marginRight: '10px' }}
                >
                    <option value="manual">Manual Input</option>
                    <option value="csv">Upload CSV</option>
                </select>
                {inputMethod === 'manual' ? (
                    <div>
                        
                        <input
                            type="text"
                            name="y"
                            value={inputY}
                            onChange={handleChange}
                            placeholder="Observed value"
                            style={{ marginRight: '10px' }}
                        />
                        <input
                            type="text"
                            name="x"
                            value={inputX}
                            onChange={handleChange}
                            placeholder="Predicted value"
                            style={{ marginRight: '10px' }}
                        />
                        <button onClick={handleAddData}>Add Data</button>
                    </div>
                ) : (
                    <div>
                        <input
                            id="fileInput"
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            style={{ marginRight: '10px' }}
                        />
                     </div>
                )}
            </div>
            <button onClick={calculateMetric} style={{ marginRight: '10px' }}>Calculate</button>
            <br></br>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
    

};

export default RMSECalculator;