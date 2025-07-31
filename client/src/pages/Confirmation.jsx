import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Confirmation = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  // Load submitted name on component mount
  useEffect(() => {
    const submittedName = localStorage.getItem('submittedName');
    if (submittedName) {
      setName(submittedName);
    }
  }, []);

  // Optional cleanup: remove the name from storage when component unmounts
  useEffect(() => {
    return () => {
      localStorage.removeItem('submittedName');
    };
  }, []);

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Thank you, {name || 'User'}!
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Your application has been received and is currently pending review.
      </p>
      <button
        onClick={handleContinue}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Confirmation;
