import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplyLeave = () => {
  const [leaveData, setLeaveData] = useState({
    employee_id: '',
    employee_name: '',
    leave_type: '',
    from_date: '',
    to_date: '',
    reason: '',
  });

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveSummary, setLeaveSummary] = useState([]);
  const [noOfDays, setNoOfDays] = useState('');
  const [message, setMessage] = useState('');
  const [maxLimitExceeded, setMaxLimitExceeded] = useState(false);
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  const [remainingBalance, setRemainingBalance] = useState(null);
  const [leaveMode, setLeaveMode] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setLeaveData(prev => ({
        ...prev,
        employee_id: storedUser.id,
        employee_name: storedUser.name,
      }));

      axios
        .get(`http://localhost:2000/api/employee/leave-summary/${storedUser.id}`)
        .then(res => setLeaveSummary(res.data.summary || []))
        .catch(err => console.error('Error fetching leave summary:', err));
    }

    axios
      .get('http://localhost:2000/api/leave/type-names')
      .then(res => setLeaveTypes(res.data))
      .catch(err => console.error('Error fetching leave types:', err));
  }, []);

  const calculateDays = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffTime = Math.abs(to - from);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...leaveData, [name]: value };
    setLeaveData(updatedData);

    if (['leave_type', 'from_date', 'to_date'].includes(name)) {
      const { leave_type, from_date, to_date } = {
        ...updatedData,
        [name]: value,
      };

      const selectedLeavePolicy = leaveTypes.find(lt => lt.leave_type === leave_type);
      const summaryEntry = leaveSummary.find(s => s.leave_type === leave_type);

      let remaining = null;
      let mode = null;

      if (summaryEntry) {
        remaining = summaryEntry.total_leaves - summaryEntry.taken_days;
        mode = summaryEntry.mode;
        setRemainingBalance({
          total: summaryEntry.total_leaves,
          taken: summaryEntry.taken_days,
          remaining,
        });
      } else {
        setRemainingBalance(null);
      }

      setLeaveMode(mode);

      if (from_date && to_date && new Date(from_date) <= new Date(to_date)) {
        const days = calculateDays(from_date, to_date);
        setNoOfDays(days);

        setMaxLimitExceeded(selectedLeavePolicy && days > selectedLeavePolicy.max_per_request);
        setInsufficientBalance(mode !== 'Free' && summaryEntry && days > remaining);
      } else {
        setNoOfDays('');
        setMaxLimitExceeded(false);
        setInsufficientBalance(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const payload = { ...leaveData, no_of_days: noOfDays };
      const res = await axios.post('http://localhost:2000/api/leave/apply', payload);

      if (res.status === 201) {
        setMessage('✅ Your leave application has been successfully submitted!');
        setLeaveData({
          ...leaveData,
          leave_type: '',
          from_date: '',
          to_date: '',
          reason: '',
        });
        setNoOfDays('');
        setMaxLimitExceeded(false);
        setInsufficientBalance(false);
        setRemainingBalance(null);
      }
    } catch (error) {
      console.error('Leave submission error:', error);
      setMessage('❌ Failed to submit leave. Please try again.');
    }
  };

  const shouldShowSubmitButton = !maxLimitExceeded && (!insufficientBalance || leaveMode === 'Free');

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column – Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 text-white">
          <h2 className="text-center text-2xl font-semibold mb-6">Apply for Leave</h2>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="employee_name" value={leaveData.employee_name} />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm">Employee ID</label>
                <input
                  type="text"
                  name="employee_id"
                  value={leaveData.employee_id}
                  readOnly
                  className="w-full rounded-md bg-white/80 text-black px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm">Leave Type</label>
                <select
                  name="leave_type"
                  value={leaveData.leave_type}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md bg-white/80 text-black px-3 py-2 text-sm"
                >
                  <option value="">-- Select --</option>
                  {leaveTypes.map((leave, index) => (
                    <option key={index} value={leave.leave_type}>
                      {leave.leave_type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm">From</label>
                <input
                  type="date"
                  name="from_date"
                  value={leaveData.from_date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md bg-white/80 text-black px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm">To</label>
                <input
                  type="date"
                  name="to_date"
                  value={leaveData.to_date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md bg-white/80 text-black px-3 py-2 text-sm"
                />
              </div>
            </div>

            {noOfDays && (
              <div className="mb-2 text-center text-sm">
                <div
                  className={`px-4 py-2 rounded-md ${
                    maxLimitExceeded ? 'bg-red-500/80' : 'bg-blue-500/80'
                  }`}
                >
                  📆 <strong>{noOfDays}</strong> day(s) applied
                  {maxLimitExceeded && (
                    <>
                      {' '}
                      – exceeds the allowed limit (
                      {
                        leaveTypes.find(lt => lt.leave_type === leaveData.leave_type)?.max_per_request ||
                        0
                      }{' '}
                      day(s)).
                    </>
                  )}
                </div>
              </div>
            )}

            {remainingBalance && (
              <div className="mb-3 text-center text-sm">
                <div
                  className={`px-4 py-2 rounded-md ${
                    insufficientBalance && leaveMode !== 'Free'
                      ? 'bg-red-500/80'
                      : 'bg-yellow-500/80'
                  }`}
                >
                  🟢 You have <strong>{remainingBalance.remaining}</strong> out of{' '}
                  <strong>{remainingBalance.total}</strong> leave(s) remaining.
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="text-sm">Reason</label>
              <textarea
                name="reason"
                value={leaveData.reason}
                onChange={handleChange}
                required
                rows="3"
                className="w-full rounded-md bg-white/80 text-black px-3 py-2 text-sm"
              />
            </div>

            {shouldShowSubmitButton ? (
              <button
                type="submit"
                className="w-full bg-white text-indigo-600 font-semibold py-2 rounded-md hover:bg-gray-100 transition"
              >
                Submit Application
              </button>
            ) : (
              <div className="text-sm text-center mt-3 bg-red-600/80 text-white py-2 px-3 rounded-md">
                ❌ You cannot apply for this leave. Either it exceeds the per-request limit or your
                remaining balance is insufficient.
              </div>
            )}

            {message && (
              <div
                className={`mt-4 text-center text-sm py-2 px-3 rounded-md ${
                  message.startsWith('✅') ? 'bg-green-500/80' : 'bg-red-500/80'
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>

        {/* Right Column – Leave Type Summary */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">📋 Leave Types & Limits</h3>
          {leaveTypes.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {leaveTypes.map((lt, idx) => (
                <li
                  key={idx}
                  className="flex justify-between border-b border-white/20 pb-1"
                >
                  <span>{lt.leave_type}</span>
                  <span>{lt.max_per_request} day(s)</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">Loading leave types...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyLeave;
