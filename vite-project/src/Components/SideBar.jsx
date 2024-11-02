import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import {
  faMagnifyingGlass,
  faBars,
  faHome,
  faFilm,
  faMusic,
  faGamepad,
  faHistory,
  faFire,
  faShoppingCart,
  faFlag,
  faNewspaper,
  faClock,
  faThumbsUp,
  faPhotoVideo,
  faPlayCircle,
  faListUl,
  faBell,
  faUserCircle, faTrophy, faBook, faBroadcastTower, faCog, faClipboardList, faQuestionCircle, faCommentDots
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { image } from '../Utils/images';

function Sidebar({ isMenuOpen, toggleMenu }) {
 
  return (
    <div
      className={`fixed  top-16 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300  ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="p-4 h-full overflow-y-auto">

        <ul className="space-y-4">
          <Link to={'/'} >
            <li className="flex items-center hover:bg-gray-200 p-2 rounded">
              <button onClick={toggleMenu}>
              <FontAwesomeIcon icon={faHome} className="mr-2 text-red-600" /> Home
              </button>
             
            </li></Link>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <img src={image[2].logo} alt="shorts logo" className='h-7 filter grayscale' /> Shorts
          </li>

          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faPlayCircle} className="mr-2" /> Subscription
          </li>
          <hr />
          <h3 className="text-lg font-semibold mb-4 ml-2">You </h3>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faHistory} className="mr-2" /> History
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faListUl} className="mr-2" /> Playlist
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faClock} className='mr-2' /> Watch later
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded text-blue-600">
            <FontAwesomeIcon icon={faThumbsUp} className='mr-2' /> Liked videos
          </li>
          <hr />
          <h3 className="text-lg font-semibold mb-4 ml-2">Explore </h3>
          <li className="flex items-center hover:bg-gray-200 p-2 text-red-600 rounded">
            <FontAwesomeIcon icon={faFire} className="mr-2" /> Trending
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> Shopping
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faMusic} className="mr-2" /> Music
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faFilm} className="mr-2" /> Movies
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faGamepad} className="mr-2" /> Gaming
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faNewspaper} className="mr-2" /> News
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faTrophy} className="mr-2" /> Sports
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faBook} className="mr-2" /> Courses
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faNewspaper} className="mr-2" /> Fashion & Beauty
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faBroadcastTower} className="mr-2" /> Podcasts
          </li>
          <hr />
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faCog} className="mr-2" /> Settings
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faFlag} className='mr-2' /> Report history
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> Help
          </li>
          <li className="flex items-center hover:bg-gray-200 p-2 rounded">
            <FontAwesomeIcon icon={faCommentDots} className="mr-2" /> Send feedback
          </li>

        </ul>
        <hr />
        <div className='text-sm text-gray-600 my-5'>

          <p className="mb-1">About Press Copyright</p>
          <p className="mb-1">Contact us Creators</p>
          <p className="mb-1">Advertise Developers</p>
        </div>

        <div className='text-sm text-gray-600 mb-5'>

          <p className="mb-1">Terms Privacy Policy & Safety</p>
          <p className="mb-1">How You Tube works</p>
          <p className="mb-5">Test new Features</p>
        </div>
        <p className='mb-28 text-sm text-gray-600'>© 2024 Google LLC</p>

      </div>
    </div>
  );
}

export default Sidebar;
