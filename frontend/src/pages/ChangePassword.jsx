import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user?.id) {
      setError('User not logged in or session expired.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:2000/api/auth/change-password', {
        userId: user.id,
        oldPassword,
        newPassword,
      });

      if (response.data.success) {
        setSuccess(response.data.message || 'Password changed successfully.');
        setTimeout(() => {
          sessionStorage.clear();
          navigate('/');
        }, 1500);
      } else {
        setError(response.data.message || 'Password change failed.');
      }
    } catch (err) {
      console.error('Change password error:', err);
      setError(err.response?.data?.message || 'An error occurred while changing password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600">
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 w-full max-w-sm text-white">
        <h2 className="text-center text-2xl font-semibold mb-6">Change Password</h2>

        {error && (
          <div className="mb-4 bg-red-500/80 text-white px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-500/80 text-white px-4 py-2 rounded-md text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md text-black bg-white/80 focus:outline-none focus:ring-2 focus:ring-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md text-black bg-white/80 focus:outline-none focus:ring-2 focus:ring-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md text-black bg-white/80 focus:outline-none focus:ring-2 focus:ring-white text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-indigo-600 font-semibold py-2 rounded-md hover:bg-gray-100 transition text-sm"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
