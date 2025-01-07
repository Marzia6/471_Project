import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profile: {
      gender: '',
      genderPreference: '',
      problemAreas: [],
      language: [],
      ageRange: '',
      bio: ''
    }
  });

  const handleProblemAreas = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        problemAreas: value.split(',').map(item => item.trim())
      }
    }));
  };

  const handleLanguages = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        language: value.split(',').map(item => item.trim())
      }
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      localStorage.setItem('token', response.data.token);
      console.log(response.data);
      alert('You joined our community!');
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Create Your Profile</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <select
          value={formData.profile.gender}
          onChange={(e) => setFormData({...formData, profile: {...formData.profile, gender: e.target.value}})}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <select
          value={formData.profile.genderPreference}
          onChange={(e) => setFormData({...formData, profile: {...formData.profile, genderPreference: e.target.value}})}
          className="w-full p-2 border rounded"
        >
          <option value="">Preferred Gender to Talk With</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="any">Any</option>
        </select>
        <input
          type="text"
          placeholder="Problem Areas (comma separated)"
          value={formData.profile.problemAreas.join(', ')}
          onChange={handleProblemAreas}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Languages (comma separated)"
          value={formData.profile.language.join(', ')}
          onChange={handleLanguages}
          className="w-full p-2 border rounded"
        />
        <select
          value={formData.profile.ageRange}
          onChange={(e) => setFormData({...formData, profile: {...formData.profile, ageRange: e.target.value}})}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Age Range</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="46+">46+</option>
        </select>
        <textarea
          placeholder="Bio"
          value={formData.profile.bio}
          onChange={(e) => setFormData({...formData, profile: {...formData.profile, bio: e.target.value}})}
          className="w-full p-2 border rounded"
          rows="4"
        />
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUp;
