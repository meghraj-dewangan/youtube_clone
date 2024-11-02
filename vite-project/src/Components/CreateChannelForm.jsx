import React, { useState } from 'react';
import SignInRegister from './Signup';
import { useUserAuth } from './UserContext';
import axios from 'axios';
import { useEffect } from 'react';


const CreateChannelForm = ({ onSubmit }) => {
  const [userData1, setUserData1] = useState([]);
  const { authenticated,userData } = useUserAuth();
  

  const [formData, setFormData] = useState({
    userId: `${userData1._id}`,
    channelName: '',
    description: '',
    profilePicture: '',
    bannerImage: '', 
  });

  


  
  const [error, setError] = useState(null); // State to handle errors


   // Fetch user details on component mount
   useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3700/auth/getuserdetail/${userData.email}`);
        if (response.data) {
          setUserData1(response.data);
         
          setFormData((prevData) => ({
            ...prevData,
            userId: response.data._id, 
          }));
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Error fetching user details. Please try again.'); // Handle fetch error
      }
    };

    if (authenticated) {
      fetchUserDetails();
    }
  }, [authenticated]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form data to be submitted:', formData); // Log form data

    try {
      const response = await axios.post('http://localhost:3700/youtube/channel', formData, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });
      console.log('Channel created:', response.data);
      if (onSubmit) onSubmit(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error creating channel:', error);
      setError('Error creating channel. Please try again.'); // Set error message
    }
  };

  return (
    <>
      {!authenticated ? (
        <SignInRegister />
      ) : (
        <div className="create-channel-form mt-24 bg-white p-8 rounded-lg shadow-md max-w-md mx-auto sm:max-w-lg md:max-w-xl mb-16">
          <h2 className="text-2xl font-semibold text-center mb-6">Create Channel</h2>

          {/* Error Message */}
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Channel Name */}
            <div className="mb-4">
              <label htmlFor="channelName" className="block text-sm font-medium text-gray-700">Channel Name</label>
              <input
                type="text"
                id="channelName"
                name="channelName"
                value={formData.channelName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter channel name"
                required
              />
            </div>

            {/* Channel Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Channel Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Briefly describe your channel"
                rows="3"
              ></textarea>
            </div>

            {/* Profile Picture URL Input */}
            <div className="mb-6">
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
              <input
                type="url"
                id="profilePicture"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter image URL"
                required
              />
            </div>

            {/* Banner Image URL Input */}
            <div className="mb-6">
              <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700">Banner Image URL</label>
              <input
                type="url"
                id="bannerImage"
                name="bannerImage"
                value={formData.bannerImage}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter banner image URL"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Create Channel
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateChannelForm;
