import React, { useState } from 'react';

const HrLeavePolicy = () => {
  const [leaveType, setLeaveType] = useState('');
  const [mode, setMode] = useState('');
  const [frequency, setFrequency] = useState('');
  const [totalLeaves, setTotalLeaves] = useState('');
  const [maxPerRequest, setMaxPerRequest] = useState('');

  // Dummy policies data to show in table
  const policies = [
    {
      id: 1,
      leave_type: 'Sick Leave',
      mode: 'Paid',
      frequency: 'Yearly',
      total_leaves: 12,
      max_per_request: 5,
    },
    {
      id: 2,
      leave_type: 'Casual Leave',
      mode: 'Paid',
      frequency: 'Yearly',
      total_leaves: 10,
      max_per_request: 3,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submit handler - implement as needed');
  };

  const handleDelete = (id) => {
    alert(`Delete policy with id: ${id} - implement as needed`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 p-4">
          <h2 className="text-white text-xl font-bold text-center">📋 HR Leave Policy Management</h2>
        </header>

        <main className="p-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Leave Type</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  placeholder="e.g., Sick Leave"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Mode</label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value="">-- Select Mode --</option>
                  <option value="Paid">Paid</option>
                  <option value="Free">Free</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Frequency</label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  <option value="">-- Select Frequency --</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Total Leaves</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  placeholder="e.g., 30"
                  value={totalLeaves}
                  onChange={(e) => setTotalLeaves(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Max Leaves per Request</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  placeholder="e.g., 5"
                  value={maxPerRequest}
                  onChange={(e) => setMaxPerRequest(e.target.value)}
                />
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-2 rounded-md transition"
              >
                ➕ Add Policy
              </button>
            </div>
          </form>

          {/* Table */}
          <section className="mt-10">
            <h3 className="text-lg font-semibold mb-4">📑 Existing Leave Policies</h3>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-md">
                <thead className="bg-cyan-600 text-white">
                  <tr>
                    <th className="py-2 px-4 border-r border-cyan-700 text-left">#</th>
                    <th className="py-2 px-4 border-r border-cyan-700 text-left">Leave Type</th>
                    <th className="py-2 px-4 border-r border-cyan-700 text-left">Mode</th>
                    <th className="py-2 px-4 border-r border-cyan-700 text-left">Frequency</th>
                    <th className="py-2 px-4 border-r border-cyan-700 text-left">Total Leaves</th>
                    <th className="py-2 px-4 border-r border-cyan-700 text-left">Max/Request</th>
                    <th className="py-2 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.length > 0 ? (
                    policies.map((policy, idx) => (
                      <tr
                        key={policy.id}
                        className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      >
                        <td className="py-2 px-4 border-r border-gray-200">{idx + 1}</td>
                        <td className="py-2 px-4 border-r border-gray-200">{policy.leave_type}</td>
                        <td className="py-2 px-4 border-r border-gray-200">{policy.mode}</td>
                        <td className="py-2 px-4 border-r border-gray-200">{policy.frequency}</td>
                        <td className="py-2 px-4 border-r border-gray-200">{policy.total_leaves}</td>
                        <td className="py-2 px-4 border-r border-gray-200">{policy.max_per_request}</td>
                        <td className="py-2 px-4">
                          <button
                            className="text-red-600 hover:text-red-800 font-semibold"
                            onClick={() => handleDelete(policy.id)}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-gray-500">
                        No leave policies found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HrLeavePolicy;
