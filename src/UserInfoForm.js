import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserInfoForm.css'; 

const UserInfoForm = ({ onFormSubmitted }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    purpose: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://wqi-k23q.onrender.com/submit-info", formData);
      onFormSubmitted();
      navigate("/");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="user-info-container">
      <div className="info-panel">
        <h1>Access Water Quality Tools</h1>
        <p>Before proceeding, please tell us a bit about yourself.</p>
        <p>This helps us improve and understand how this tool is used.</p>
        <p>Your insights will contribute to cleaner, safer water!</p>
      </div>

      <div className="form-panel">
        <h2>What is Water Quality Index?</h2>
        <p>The WQI is a simplified score from multiple water tests that shows the health of a water body.</p>
        <p>It helps monitor pollution, guide action, and spread awareness.</p>

        <form onSubmit={handleSubmit} className="styled-form">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Designation / Organisation</label>
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} required />

          <label>Purpose</label>
          <textarea name="purpose" value={formData.purpose} onChange={handleChange} required />

          <button type="submit">Submit and Continue</button>
        </form>
      </div>
    </div>
  );
};

export default UserInfoForm;
