// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const navigate = useNavigate();

  // ✅ Restrict access to logged-in users only
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [financialsUploaded, setFinancialsUploaded] = useState(false);
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [debt, setDebt] = useState('');
  const [score, setScore] = useState(null);
  const [type, setType] = useState('product');
  const [sector, setSector] = useState('fashion');
  const [years, setYears] = useState('');

  // ✅ File upload handler (handles both license and financials)
  const handleFileUpload = async (type, file) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    try {
      const res = await fetch('http://localhost:5000/upload', {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        if (type === "license") setLicenseUploaded(true);
        if (type === "financials") setFinancialsUploaded(true);
        console.log("Upload successful:", data.fileUrl);
      } else {
        alert(data.error || "Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong during file upload.");
    }
  };

  const calculateScore = () => {
    const i = parseFloat(income);
    const e = parseFloat(expenses);
    const d = parseFloat(debt);

    if (isNaN(i) || isNaN(e) || isNaN(d)) {
      alert("Please fill in valid financial data.");
      return;
    }

    const profit = i - e;
    const base = 100;
    let s = base;

    if (profit <= 0) s -= 40;
    if (d > profit * 0.5) s -= 30;
    if (e > i) s -= 20;

    s = Math.max(0, Math.min(s, 100));
    setScore(s);
  };

  const handleApplyNow = () => {
    navigate('/applicationform');
  };

  const chartData = {
    labels: ['Income', 'Expenses', 'Debt'],
    datasets: [
      {
        label: 'KSh',
        data: [parseFloat(income) || 0, parseFloat(expenses) || 0, parseFloat(debt) || 0],
        backgroundColor: ['#2563EB', '#F59E0B', '#DC2626'],
      },
    ],
  };

  const canApply = licenseUploaded && financialsUploaded;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Welcome Header */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Welcome, Jane Creatives</h2>
          <p className="text-sm text-gray-600 mt-1">
            Application Status:
            <span className={`ml-2 font-medium ${canApply ? 'text-green-600' : 'text-yellow-600'}`}>
              {canApply ? 'Ready to Apply' : 'Pending'}
            </span>
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-2">Progress Tracker</h3>
          <div className="flex flex-col md:flex-row gap-2 text-sm">
            <div className="flex items-center gap-2"><span className="text-green-600">✔</span> Signup</div>
            <div className="flex items-center gap-2"><span className="text-green-600">✔</span> Profile Info</div>
            <div className="flex items-center gap-2">
              <span className={canApply ? 'text-green-600' : 'text-yellow-500'}>
                {canApply ? '✔' : '⏳'}
              </span> Upload Documents
            </div>
            <div className="flex items-center gap-2"><span className="text-gray-400">•</span> Await Review</div>
          </div>
        </div>

        {/* MAIN SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {/* Upload Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
              <h3 className="font-semibold text-gray-800">Upload Required Documents</h3>

              <div>
                <label className="block text-sm mb-1">Business License (PDF/Image)</label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      handleFileUpload('license', e.target.files[0]);
                    }
                  }}
                  className="w-full border p-2 rounded"
                />
                {licenseUploaded && <p className="text-green-600 text-sm mt-1">✓ License uploaded</p>}
              </div>

              <div>
                <label className="block text-sm mb-1">Financial Proof (e.g., Bank Statement)</label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      handleFileUpload('financials', e.target.files[0]);
                    }
                  }}
                  className="w-full border p-2 rounded"
                />
                {financialsUploaded && <p className="text-green-600 text-sm mt-1">✓ Financials uploaded</p>}
              </div>
            </div>

            {/* Financial Input Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
              <h2 className="text-2xl font-bold mb-4 text-center">Financial Readiness Form</h2>
              <input
                type="number"
                placeholder="Monthly Income (KSh)"
                className="w-full border p-2 rounded"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
              <input
                type="number"
                placeholder="Monthly Expenses (KSh)"
                className="w-full border p-2 rounded"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
              />
              <input
                type="number"
                placeholder="Outstanding Debt (KSh)"
                className="w-full border p-2 rounded"
                value={debt}
                onChange={(e) => setDebt(e.target.value)}
              />
              <select
                className="w-full border p-2 rounded"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="product">Product</option>
                <option value="service">Service</option>
                <option value="both">Both</option>
              </select>
              <select
                className="w-full border p-2 rounded"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                <option value="fashion">Fashion</option>
                <option value="music">Music</option>
                <option value="film">Film</option>
                <option value="crafts">Crafts</option>
                <option value="digital">Digital Content</option>
              </select>
              <input
                type="number"
                placeholder="Years in Business"
                className="w-full border p-2 rounded"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                required
              />
              <button onClick={calculateScore} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Calculate Readiness Score
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-800 mb-2">Your Investment Readiness Snapshot</h3>

            {/* Score */}
            {score !== null && (
              <div className="text-center space-y-2">
                <div className="text-5xl font-bold text-blue-700">{score}/100</div>
                <div className="text-sm text-gray-600">
                  {score >= 80
                    ? 'Great! You’re investor-ready.'
                    : score >= 50
                      ? 'Fair. Needs some improvements.'
                      : 'Risky. Work on your financials.'}
                </div>
              </div>
            )}

            {/* Chart */}
            <Bar data={chartData} />

            {/* Recommendation */}
            {score !== null && (
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 text-sm text-blue-800 mt-4 rounded">
                Recommendation: {score >= 80 ? 'Apply confidently.' : 'Reduce debt & improve profit margin before applying.'}
              </div>
            )}
          </div>
        </div>

        {/* Program Announcements */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Program Announcements</h3>
          <div className="space-y-3">
            <div className="border p-4 rounded">
              <h4 className="font-bold text-lg text-blue-800">Creative Business Fund 2025</h4>
              <p className="text-sm text-gray-600">Apply for up to KES 500,000 to scale your business in fashion, music, or digital content.</p>
              {canApply ? (
                <button
                  onClick={handleApplyNow}
                  className="mt-2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
                  Apply Now
                </button>
              ) : (
                <p className="mt-2 text-red-600 text-sm">Upload all required docs to apply.</p>
              )}
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-2">Contact our team if you need assistance with your application.</p>
          <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
