

import React, { useState, useEffect } from 'react';
// import apiClient from '@/api/axiosConfig';
// import useAuth from '@/hooks/useAuth';
// import { PERMISSIONS } from '@/config/permissions';
// import AccessDenied from '@/components/AccessDenied';

// --- Icons ---
import {
  FaShieldAlt,
  FaCalendarCheck,
  FaStar,
  FaPercentage,
  FaSpinner,
  FaExclamationTriangle
} from 'react-icons/fa';

// --- Mocks (Placeholders for actual imports, replace with your code) ---
const useAuth = () => ({ user: { is_master: true, permissions: [] } });
const AccessDenied = () => <div className="p-8">Access Denied</div>;
const PERMISSIONS = { PAGES: { INCREMENT_POLICY: 'policy_page' } };
const apiClient = {
  get: () => Promise.resolve({
    data: [
      { rating: 5, level: "Outstanding", percentage: 15.0 },
      { rating: 4, level: "Exceeds Expectations", percentage: 10.0 },
      { rating: 3, level: "Meets Expectations", percentage: 5.0 },
      { rating: 2, level: "Needs Improvement", percentage: 3.0 },
      { rating: 1, level: "Unsatisfactory", percentage: 1.0 },
    ]
  })
};
// --- End Mocks ---

const EmployeeePermissionList = () => {
  const [incrementPolicyData, setIncrementPolicyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const canViewPolicy = user.is_master || user.permissions.includes(PERMISSIONS.PAGES.INCREMENT_POLICY);

  useEffect(() => {
    if (canViewPolicy) {
      const fetchPolicy = async () => {
        try {
          const res = await apiClient.get('/policy/increment');
          // Sort data from highest rating to lowest
          setIncrementPolicyData(res.data.sort((a, b) => b.rating - a.rating));
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to load increment policy.');
        } finally {
          setLoading(false);
        }
      };
      fetchPolicy();
    } else {
      setLoading(false);
    }
  }, [canViewPolicy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <FaSpinner className="text-5xl text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!canViewPolicy) {
    return <AccessDenied />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Page Header */}
        <header className="mb-10 text-center">
          <FaShieldAlt className="mx-auto text-5xl text-blue-600 mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-800">Company Increment Policy</h1>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Our policy for calculating annual salary increments is based on performance and tenure.
          </p>
        </header>

        <div className="space-y-8">
          {/* Eligibility & Performance Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <FaCalendarCheck className="text-2xl text-blue-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-800">Eligibility Criteria</h2>
              </div>
              <p className="text-gray-600">
                To be eligible for an annual increment, an employee must have completed a minimum of <strong className="text-blue-700">180 days of service</strong>.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <FaStar className="text-2xl text-blue-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-800">Performance Rating</h2>
              </div>
              <p className="text-gray-600">
                The increment is tied to the employee's <strong className="text-blue-700">average task rating</strong>, rounded to the nearest whole number.
              </p>
            </div>
          </div>

          {/* Increment Table Section */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center">
                  <FaPercentage className="text-2xl text-blue-600 mr-3"/>
                  <h2 className="text-2xl font-bold text-gray-800">Increment Percentage Table</h2>
              </div>
              <p className="text-gray-600 mt-1">
                The following table outlines the percentage awarded for each performance level.
              </p>
            </div>
            <div className="p-4">
              {error ? (
                <div className="m-4 bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex items-start space-x-3">
                    <FaExclamationTriangle className="text-red-500 text-xl mt-1" />
                    <div>
                        <h3 className="font-bold text-red-800">Error</h3>
                        <p className="text-red-700">{error}</p>
                    </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Rating</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance Level</th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Increment Percentage</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {incrementPolicyData.map((item) => (
                        <tr key={item.rating} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 flex items-center">
                            {item.rating}
                            <FaStar className="ml-2 text-yellow-500" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">{item.level}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-gray-900">{item.percentage.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeePermissionList;