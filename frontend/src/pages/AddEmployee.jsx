import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import apiClient from '@/api/axiosConfig'; // अपनी API कॉन्फ़िगरेशन का उपयोग करें
// import { toast } from 'sonner';
import { FaUserPlus, FaTimes, FaPaperPlane, FaSpinner, FaExclamationTriangle, FaUpload } from 'react-icons/fa';

// ImageUploader कंपोनेंट का एक स्टाइल किया हुआ संस्करण
// आप इसे अपनी मौजूदा ImageUploader कार्यक्षमता के साथ बदल सकते हैं
const ImageUploader = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-2 flex items-center gap-4">
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <FaUserPlus className="text-gray-400 text-3xl" />
        )}
      </div>
      <div>
        <label htmlFor="picture-upload" className="cursor-pointer bg-white text-gray-700 font-semibold px-5 py-2 border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition-colors">
          <FaUpload className="inline mr-2" />
          Choose Image
        </label>
        <input id="picture-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        {fileName && <p className="text-sm text-gray-500 mt-2">{fileName}</p>}
      </div>
    </div>
  );
};


const AddEmployee = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    joined_at: '',
  });
  const [pictureFile, setPictureFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (pictureFile) {
      formData.append('picture', pictureFile);
    }

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form Submitted:', Object.fromEntries(formData.entries()));
      // toast.success("Invitation sent successfully!");
      navigate('/'); // सफलता पर होम पेज पर वापस जाएँ
    } catch (err) {
      setError('An error occurred while sending the invitation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                      <FaUserPlus className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                      <h2 className="text-3xl font-bold text-gray-800">Invite New Employee</h2>
                      <p className="text-gray-500 mt-1">Fill out the form below to add a new team member.</p>
                  </div>
              </div>
          </div>
          
          {/* Form Section */}
          <form onSubmit={handleSubmit}>
            <div className="p-8 space-y-8">
              <div>
                <label className="text-lg font-semibold text-gray-700">Profile Picture</label>
                <ImageUploader onFileSelect={setPictureFile} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="font-semibold text-gray-700">Full Name</label>
                    <input id="name" name="name" value={formState.name} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="font-semibold text-gray-700">Email Address</label>
                    <input id="email" type="email" name="email" value={formState.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="phone" className="font-semibold text-gray-700">Phone</label>
                    <input id="phone" name="phone" value={formState.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="joined_at" className="font-semibold text-gray-700">Joining Date</label>
                    <input type="date" id="joined_at" name="joined_at" value={formState.joined_at} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="font-semibold text-gray-700">Address</label>
                <textarea id="address" name="address" value={formState.address} onChange={handleInputChange} rows="3" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex items-start space-x-3">
                  <FaExclamationTriangle className="text-red-500 text-xl mt-1" />
                  <div>
                    <h3 className="font-bold text-red-800">Error</h3>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer and Action Buttons */}
            <div className="bg-gray-50 px-8 py-5 flex justify-end items-center space-x-4">
              <button type="button" onClick={() => navigate('/')} disabled={loading} className="px-8 py-3 font-semibold text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                <FaTimes className="inline mr-2" /> Cancel
              </button>
              <button type="submit" disabled={loading} className="flex items-center justify-center bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105 disabled:bg-blue-400 disabled:scale-100">
                {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaPaperPlane className="mr-2" />}
                {loading ? 'Sending...' : 'Send Invitation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;