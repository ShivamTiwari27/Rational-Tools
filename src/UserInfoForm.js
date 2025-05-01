import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserInfoForm = ({ onFormSubmitted }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
      await axios.post("https://rational-tools.onrender.com/submit-info", formData);
      onFormSubmitted(); // Update App.js state
      navigate("/");     // Redirect to home page
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label><br />
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>Purpose:</label><br />
          <textarea name="purpose" value={formData.purpose} onChange={handleChange} required />
        </div>
        <br />
        <button type="submit">Submit and Continue</button>
      </form>
    </div>
  );
};

export default UserInfoForm;
