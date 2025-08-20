import React, { useState, useEffect, useCallback } from 'react';
// import apiClient from '@/api/axiosConfig';
// import { useDebounce } from "@/hooks/useDebounce"; // Make sure you have this custom hook

// --- Icons ---
import {
  FaChartLine,
  FaSearch,
  FaSpinner,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

// --- Mocks (Placeholders for actual imports, replace with your code) ---
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const apiClient = {
  get: () => Promise.resolve({
    data: {
      data: [
        { id: 1, name: 'Alice Johnson', days_of_service: 365, average_rating: 4.5, current_salary: 500000, is_eligible: true, increment_percentage: 10.0, new_salary: 550000 },
        { id: 2, name: 'Bob Williams', days_of_service: 150, average_rating: 3.8, current_salary: 450000, is_eligible: false, increment_percentage: 0, new_salary: 450000 },
        { id: 3, name: 'Charlie Brown', days_of_service: 730, average_rating: 2.9, current_salary: 600000, is_eligible: true, increment_percentage: 5.0, new_salary: 630000 },
      ],
      totalPages: 1,
    }
  })
};
// --- End Mocks ---

const HrPolicy = () => {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(true); // Start with true
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [sorting, setSorting] = useState([{ id: 'average_rating', desc: true }]);

    const fetchData = useCallback(async () => {
        setLoading(true); // Set loading to true on fetch
        try {
            const params = {
                page: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
                sortBy: sorting[0]?.id || 'average_rating',
                sortOrder: sorting[0]?.desc ? 'DESC' : 'ASC',
                search: debouncedSearchTerm,
            };
            const res = await apiClient.get('/increment-report', { params });
            setData(res.data.data);
            setPageCount(res.data.totalPages);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate report.');
        } finally {
            setLoading(false);
        }
    }, [pagination, sorting, debouncedSearchTerm]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4">
            <div className="container mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Annual Increment Report</h1>
                    <p className="text-gray-500 mt-1">Performance-based salary increment eligibility and projections.</p>
                </header>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                         <div className="flex items-center space-x-3">
                            <FaChartLine className="text-2xl text-blue-600"/>
                            <h2 className="text-2xl font-bold text-gray-800">Report Data</h2>
                         </div>
                        <div className="relative w-full md:w-auto">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search by employee name..."
                                className="w-full md:w-80 pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="p-4">
                        {loading ? (
                            <div className="flex justify-center items-center h-80">
                                <FaSpinner className="text-4xl text-blue-600 animate-spin" />
                            </div>
                        ) : error ? (
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
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service Days</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg. Rating</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Salary</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Eligible</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Increment %</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">New Salary</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {data.map((emp) => (
                                            <tr key={emp.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{emp.name}</td>
                                                <td className="px-6 py-4 text-gray-700">{emp.days_of_service}</td>
                                                <td className="px-6 py-4 text-gray-700">{emp.average_rating ? emp.average_rating.toFixed(1) : 'N/A'}</td>
                                                <td className="px-6 py-4 text-gray-700">{formatCurrency(emp.current_salary)}</td>
                                                <td className="px-6 py-4 text-center">
                                                    {emp.is_eligible ? (
                                                        <FaCheckCircle className="text-green-500 text-xl mx-auto" title="Yes" />
                                                    ) : (
                                                        <FaTimesCircle className="text-red-500 text-xl mx-auto" title="No" />
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-blue-600">{emp.increment_percentage.toFixed(1)}%</td>
                                                <td className="px-6 py-4 font-bold text-green-700">{formatCurrency(emp.new_salary)}</td>
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
    );
};

export default HrPolicy;