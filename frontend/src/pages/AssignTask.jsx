import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employee_id: '',
    employee_name: '',
    role: '',
    task_name: '',
    assignment_date: '',
    time_required: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));

    if (!storedUser) {
      alert('Session expired. Please login again.');
      navigate('/login');
      return;
    }

    setFormData(prev => ({
      ...prev,
      employee_id: storedUser.id,
      employee_name: storedUser.name,
      role: storedUser.role
    }));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:2000/api/hr/assigntasks', formData);
      if (response.status === 200) {
        alert('Task Assigned Successfully!');
        setFormData(prev => ({
          ...prev,
          task_name: '',
          assignment_date: '',
          time_required: ''
        }));
      }
    } catch (error) {
      console.error('Error assigning task:', error);
      alert('Failed to assign task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-700 via-sky-800 to-indigo-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
        <h2 className="text-center text-white text-xl font-bold mb-4">
          Assign Task to Yourself
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm text-white mb-1">Employee ID</label>
            <input
              type="text"
              name="employee_id"
              value={formData.employee_id}
              readOnly
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Employee Name</label>
            <input
              type="text"
              name="employee_name"
              value={formData.employee_name}
              readOnly
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              readOnly
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Task Name</label>
            <input
              type="text"
              name="task_name"
              value={formData.task_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Assignment Date</label>
            <input
              type="date"
              name="assignment_date"
              value={formData.assignment_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Time Required (in hrs)</label>
            <input
              type="number"
              step="0.1"
              name="time_required"
              min="0.1"
              value={formData.time_required}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 rounded-md bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
          >
            {isSubmitting ? 'Assigning...' : 'Assign Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTask;
