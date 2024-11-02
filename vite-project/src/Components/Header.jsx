import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faUserCircle, faMagnifyingGlass, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './SideBar';
import RightSidebar from './RightSideBar';
import { image } from '../Utils/images';
import { useUserAuth } from './UserContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Sidebar state
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false); // Right sidebar state
  const [input, setInput] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Search input toggle for small screens
  const [errorMsg, SetErrorMsg] = useState('')
  const navigate = useNavigate();
  const { userData, authenticated } = useUserAuth();

  function handleSearch() {
    if (input.trim() !== "") {
      navigate(`/search/${input}`);
    } else {
      navigate('/');
    }
  }

  useEffect(() => {
    handleSearch();
  }, [input]);

  // Toggle the menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle the right sidebar open/close
  const toggleRightMenu = () => {
    setIsRightMenuOpen(!isRightMenuOpen);
  };

  return (


    <header className="flex items-center justify-between  p-4 bg-white z-50 fixed top-0 left-0 right-0">
      {!isSearchOpen ? (
        <>
          {/* Hamburger Button */}
          <button onClick={toggleMenu} className="text-xl p-2">
            <FontAwesomeIcon icon={faBars} />
          </button>

          {/* YouTube Logo */}
          <div className="flex items-center relative xl:right-48 space-x-4 lg:right-20">
            <img src={image[0].logo} alt="YouTube Logo" className="h-10 sm:h-5" />
          </div>

          {/* Search Input */}
          <div className="flex justify-center items-center w-full max-w-xs md:max-w-md lg:max-w-lg">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search"
              className="px-4 py-2 hidden sm:block w-full border border-gray-300 h-11 rounded-l-full focus:outline-none"
            />
            <button
              className="hidden sm:block bg-gray-200 text-black px-4 h-11 rounded-r-full border-gray-300 md:px-7 hover:bg-red-600"
              onClick={handleSearch}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>

            {/* Small screen search button */}
            <button
              className="text-center sm:hidden ml-11 bg-gray-200 text-black px-4 h-11 rounded-full border-gray-300 md:px-7 hover:bg-red-600"
              onClick={() => setIsSearchOpen(true)}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            <button className="relative p-2 lg:right-16 md:right-4 xl:right-56 sm:p-2 rounded-full hover:bg-gray-200">
              <FontAwesomeIcon icon={faMicrophone} className="text-lg text-gray-500 lg:text-2xl" />
            </button>

            {/* Bell Icon */}
            <button className="relative p-1 sm:p-2 max-sm:hidden rounded-full hover:bg-gray-200 hover:text-red-600">
              <FontAwesomeIcon icon={faBell} className="text-lg lg:text-2xl" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">!</span>
            </button>
            
            {/* User Icon */}
             {authenticated? (
               <div className='flex flex-col items-center justify-center '>
               <button
                 onClick={toggleRightMenu}
                 className="p-2 rounded-full  max-sm:h-11 max-sm:w-11 hover:bg-gray-200 flex items-center"
               >
                 {userData?.avatar ? (
                   <img
                     src={userData.avatar}
                     alt="User Avatar"
                     className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                   />
                 ) : (
                   <FontAwesomeIcon icon={faUserCircle} className="text-xl lg:text-2xl" />
                 )}
               </button>
               <div className='text-gray-600 text-xs'>
                 {userData?.username}
               </div>
             </div>
             ):(
              <div>
                <Link to='/signup' className='rounded-full border-2 border-gray-600 px-2 py-1'>Signin</Link>
              </div>
             )}
            
           
          </div>

          {/* Sidebar and RightSidebar Components */}
          <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <RightSidebar isRightMenuOpen={isRightMenuOpen} toggleRightMenu={toggleRightMenu} />
        </>
      ) : (
        <div className="flex items-center justify-between w-full">
          {/* Search Input for small screens */}
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search"
            className="px-4 py-2 w-full border border-gray-300 h-11 rounded-l-full focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-gray-200 text-black px-4 h-11 rounded-r-full border-gray-300 hover:bg-red-600"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 text-xl"
          >
            X {/* Close button */}
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
