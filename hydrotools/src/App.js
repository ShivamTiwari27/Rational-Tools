import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Tools from './Components/Tools';
import RMSECalculator from './Components/RMSE';
import WQI from './Components/Wqi';
import CWQI from './Components/Cwqi';
import NFSWQI from './Components/Nfswqi';
import OwqiCalculator from './Components/OwqiCalculator';
import WQISelector from './Components/WQISelector';
import UserInfoForm from './UserInfoForm';

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          {!formSubmitted && (
            <>
              <Route path="*" element={<Navigate to="/intro" replace />} />
              <Route path="/intro" element={<UserInfoForm onFormSubmitted={() => setFormSubmitted(true)} />} />
            </>
          )}
          {formSubmitted && (
            <>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/tools" element={<Tools />} />
              <Route exact path="/RMSE" element={<RMSECalculator />} />
              <Route exact path="/WQI" element={<WQI />} />
              <Route exact path="/CWQI" element={<CWQI />} />
              <Route exact path="/NFSWQI" element={<NFSWQI />} />
              <Route exact path="/OWQI" element={<OwqiCalculator />} />
              <Route exact path="/WQISELECTOR" element={<WQISelector />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
