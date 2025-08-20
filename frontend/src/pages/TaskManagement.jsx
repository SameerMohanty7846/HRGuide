import React, { useState } from 'react';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      task_name: 'Update Employee Records',
      task_status: 'Pending',
      time_required: 3,
      time_taken: null,
      rating: null,
    },
    {
      id: 2,
      task_name: 'Prepare Payroll Report',
      task_status: 'In Progress',
      time_required: 5,
      time_taken: 2,
      rating: 4,
    },
    {
      id: 3,
      task_name: 'Team Meeting Summary',
      task_status: 'Paused',
      time_required: 1,
      time_taken: 0.5,
      rating: 3,
    },
    {
      id: 4,
      task_name: 'Client Feedback Analysis',
      task_status: 'Completed',
      time_required: 4,
      time_taken: 4,
      rating: 5,
    },
  ]);

  const isActionDisabled = (task, action) => {
    const status = task.task_status;
    if (status === 'Completed') return true;
    switch (action) {
      case 'start': return status !== 'Pending' && status !== 'Not Completed';
      case 'pause': return status !== 'In Progress';
      case 'resume': return status !== 'Paused';
      case 'finish': return status !== 'In Progress' && status !== 'Paused';
      default: return true;
    }
  };

  const renderRatingStars = (rating) => {
    if (!rating) return '-';
    const intRating = Math.floor(rating);
    const maxStars = 5;
    return '⭐'.repeat(intRating) + '☆'.repeat(maxStars - intRating);
  };

  const renderActionButtons = (task) => {
    if (task.task_status === 'Completed') {
      return <span className="text-success fw-bold">Task Completed</span>;
    }

    return (
      <>
        <button
          className="btn btn-primary btn-sm me-1"
          disabled={isActionDisabled(task, 'start')}
        >
          Start
        </button>
        <button
          className="btn btn-warning btn-sm me-1"
          disabled={isActionDisabled(task, 'pause')}
        >
          Pause
        </button>
        <button
          className="btn btn-success btn-sm me-1"
          disabled={isActionDisabled(task, 'resume')}
        >
          Resume
        </button>
        <button
          className="btn btn-danger btn-sm"
          disabled={isActionDisabled(task, 'finish')}
        >
          Finish
        </button>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 py-5 px-3">
      <div className="container bg-white bg-opacity-10 backdrop-blur-md rounded-4 p-4 shadow-lg text-white">
        <h2 className="fw-bold mb-4 text-white text-center text-lg">Task Management</h2>

        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover mt-3 rounded-3 overflow-hidden">
            <thead>
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Time Required</th>
                <th>Time Taken</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.task_name}</td>
                  <td>
                    <span className={`badge ${
                      task.task_status === 'Completed' ? 'bg-success' :
                      task.task_status === 'In Progress' ? 'bg-primary' :
                      task.task_status === 'Paused' ? 'bg-warning text-dark' :
                      'bg-secondary'
                    }`}>
                      {task.task_status}
                    </span>
                  </td>
                  <td>{renderActionButtons(task)}</td>
                  <td>{task.time_required} hrs</td>
                  <td>{task.time_taken || '-'}</td>
                  <td>{renderRatingStars(task.rating)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>
        {`
          .table th, .table td {
            vertical-align: middle;
          }
        `}
      </style>
    </div>
  );
};

export default TaskManagement;
