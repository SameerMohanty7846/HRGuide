import React, { useState } from 'react';
import { FaPlus, FaTimes, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

const AssignTask = ({ isOpen, onClose, onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const handleClose = () => {
        setTitle('');
        setDescription('');
        setError('');
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Task Created:', { title, description });
            // In a real app, you would have your API client call here:
            // await apiClient.post('/tasks', { title, description });
            onTaskCreated();
            handleClose();
        } catch (err) {
            setError('Failed to create task.',err);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 animate-fade-in-up">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <FaPlus className="text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Create New Task</h2>
                    </div>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <FaTimes size={22} />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label htmlFor="title" className="text-lg font-semibold text-gray-700 mb-2 block">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                            placeholder="e.g., Finalize project report"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="text-lg font-semibold text-gray-700 mb-2 block">Description</label>
                        <textarea
                            id="description"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                            placeholder="Provide a brief summary of the task..."
                        ></textarea>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex items-start space-x-3">
                            <FaExclamationTriangle className="text-red-500 text-xl" />
                            <div>
                                <h3 className="font-bold text-red-800">Error</h3>
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Footer with Buttons */}
                    <div className="flex justify-end items-center pt-4 space-x-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={submitting}
                            className="px-6 py-3 font-semibold text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex items-center justify-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105 disabled:bg-blue-400 disabled:scale-100"
                        >
                            {submitting && <FaSpinner className="animate-spin mr-2" />}
                            {submitting ? "Creating..." : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignTask;