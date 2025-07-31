// src/pages/Welcome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import splashImage from '../assets/splash.jpg'; // replace with your actual image

const Welcome = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/signup');
  };

  return (
  <div
    className="min-h-screen flex items-center justify-center bg-stone-950 relative px-4"
    style={{
      backgroundImage: `url(${splashImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-stone-950/50 backdrop-brightness-20" />

    {/* Content */}
    <div className="relative z-10 text-center">
      <h1 className="text-4xl font-bold text-white mb-2">HEVA Ready</h1>
      <p className="text-lg text-gray-300 mb-8">
        Your journey to investment readiness starts here.
      </p>
      <div className="space-y-4">
        <button
          onClick={handleStart}
          className="bg-blue-600 hover:bg-blue-700 text-amber-300 font-semibold py-3 px-6 rounded-2xl shadow-lg transition block mx-auto"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition block mx-auto"
        >
          System Settings
        </button>
      </div>
    </div>
  </div>
);

};

export default Welcome;
