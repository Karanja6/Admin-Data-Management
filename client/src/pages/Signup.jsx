// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        navigate('/form'); // go to next page
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Something went wrong.');
    }
  };

  const continueAsGuest = () => {
    navigate('/form');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-xl p-8 shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password (optional)"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-right">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() => alert('Forgot Password flow coming soon')}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-blue-800 font-semibold py-2 px-4 rounded-md transition"
        >
          Sign Up
        </button>

        <button
          type="button"
          onClick={continueAsGuest}
          className="w-full mt-2 text-blue-600 hover:underline text-sm"
        >
          Continue as Guest
        </button>
      </form>
    </div>
  );
};

export default Signup;
