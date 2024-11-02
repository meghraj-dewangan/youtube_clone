import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBell, faSignOutAlt, faUser, faVideo, faShoppingCart, faDollarSign, faFileAlt, faKeyboard, faShield, faQuestionCircle, faCommentDots, faMoon, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { image } from '../Utils/images';
import { Link } from 'react-router-dom';
import { useUserAuth } from './UserContext';
import CreateChannelForm from './CreateChannelForm';
import ChannelPage from './ChannelPage.jsx';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


function RightSidebar({ isRightMenuOpen, toggleRightMenu }) {

    const [userDetail, setUserDetail] = useState([]);

    const { handleLogout, userData } = useUserAuth();
    useEffect(() => {
        const fetchChannelDetails = async () => {
            if (userData && userData._id) { // Ensuring userData and userId exist
                try {
                    const response = await axios.get(`http://localhost:3700/youtube/channel/user/${userData._id}`);
                    setUserDetail(response.data); // Assuming response.data contains the channel details

                } catch (error) {
                    console.error("Error fetching channel details:", error.message);
                }
            }
        };

        fetchChannelDetails();
    }, [userData]);


    const isChannelCreated = userDetail && userDetail.owner;

    return (
        <div
            className={`fixed top-16 right-0 h-full md:w-64 md:block w-full bg-white z-40 shadow-lg transform transition-transform duration-300 ${isRightMenuOpen ? 'translate-x-0 ' : 'translate-x-full'
                }`}
        >
            <div className="p-4 h-full overflow-y-auto ">
                <div className='flex mb-10 mt-10 ml-4 items-center flex-col'>
                    <div className='border-black border-2  h-20 w-20 border-solid  rounded-full'>
                        {
                            userData?.avatar ? (
                                <img src={userData.avatar} alt="avatar" className='h-20 border-hidden rounded-full ' />
                            ) :
                                (<img src={image[3].logo} alt="use logo" className='h-16 relative left-2' />)
                        }

                    </div>




                    {/* Conditionally render username or Register/Login button */}
                    {userData ? (
                        <div className="flex flex-col items-center my-2">
                            <span className="font-serif text-sm">{userData.username}</span> {/* Display username if logged in */}
                            <p className="font-serif text-sm">{userData.email}</p> {/* Display email if logged in */}
                        </div>
                    ) : (
                        <Link to={'/signup'}>
                            <button onClick={toggleRightMenu} className='my-2 font-bold'>Register / Login</button>
                        </Link>
                    )}

                    {isChannelCreated ? (
                        <Link to={`/channelpage/${userDetail.channelId}`}>
                            <p className="text-sm text-gray-600 hover:text-gray-800">• View Channel</p>
                        </Link>
                    ) : (
                        <Link to="/channelform">
                            <p className="text-sm text-gray-600 hover:text-gray-800">Create Channel</p>
                        </Link>
                    )}

                </div>
                <hr />
                <ul className="space-y-4 mb-28">
                    <li className="flex items-center font-light  hover:bg-gray-200 p-2 rounded">
                        <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Google Account
                    </li>
                    <li className="flex items-center font-light  hover:bg-gray-200 p-2 rounded">
                        <FontAwesomeIcon icon={faUser} className="mr-2" /> Switch account
                    </li>
                    <li className="flex items-center font-light hover:bg-gray-200 p-2 rounded" onClick={() => { handleLogout(); toggleRightMenu(); }}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Sign Out
                    </li>

                    <hr />
                    <li className="flex items-center font-light hover:bg-gray-200 relative right-2 p-2 rounded">
                        <img src={image[4].logo} alt="shorts logo" className='h-7 filter grayscale bg-gray-300' /> YouTube Studio
                    </li>
                    <li className="flex items-center  font-light  hover:bg-gray-200 p-2 rounded">
                        <FontAwesomeIcon icon={faDollarSign} className="mr-2" /> Purchases and memberships
                    </li>
                    <hr />
                    <li className="flex items-center font-light  hover:bg-gray-200 p-2 rounded">
                        <FontAwesomeIcon icon={faFileAlt} className="mr-2" /> Your data in YouTube
                    </li>
                    <li className="flex items-center font-light  hover:bg-gray-200 p-2 rounded">
                        <FontAwesomeIcon icon={faMoon} className="mr-2" /> Appearance: Device theme
                    </li>
                    <li className="flex items-center font-light  hover:bg-gray-200 p-2 rounded">
                        <FontAwesomeIcon icon={faGlobe} className="mr-2" /> Language: English
                    </li>
                    <li className="flex items-center font-light text-black   hover:bg-gray-200 p-2 rounded">
                        <FontAwesomeIcon icon={faShield} className='mr-2' /> Restricted Mode: Off
                    </li>
                    <li className="flex items-center font-light  hover:bg-gray-200 p-2 rounded">
                        <FontAwesomeIcon icon={faKeyboard} className='mr-2' /> Keyboard Shortcuts
                    </li>
                    <hr />
                    <li className="flex items-center font-light  hover:bg-gray-200 p-2 rounded">
                        <FontAwesomeIcon icon={faCog} className="mr-2" /> Settings
                    </li>
                    <hr />
                    <li className="flex items-center font-light  hover:bg-gray-200 p-2 rounded">
                        <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> Help
                    </li>
                    <li className="flex items-center  font-light  hover:bg-gray-200 p-2 rounded">
                        <img src={image[5].logo} alt="feedback logo" className='h-5 mr-2' /> Send feedback
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default RightSidebar;
