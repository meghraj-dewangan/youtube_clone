import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faThList, faUserCircle, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { image } from '../Utils/images';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import RightSidebar from './RightSideBar';
import BottomNavYou from './BottomNavYou';
import { useUserAuth } from './UserContext';








function BottomNavigation() {

  const location = useLocation();
  const { userData } = useUserAuth();

  return (

    <>
      {/* for large screen  */}
      {location.pathname === '/' && (
        <div className="  hidden sm:block  md:block   fixed top-0 left-0 z-50 md:z-30 sm:z-30  right-0 bg-white   shadow-lg border-t border-gray-300">
          <div className="flex justify-around  sm:flex-col sm:absolute sm:left-0 sm:top-28 md:flex-col md:absolute md:left-0 md:top-28 px-2  ">
            {/* Home */}
            <Link to={'/'}>
              <div className="flex flex-col sm:mb-5  pb-2 items-center md:mb-5">
                <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                  <FontAwesomeIcon icon={faHome} className="text-base" />
                </div>
                <button className="text-xs">Home</button>
              </div>
            </Link>

            {/* Shorts */}
            <div className="flex flex-col  sm:mb-5 items-center md:mb-5">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                <img src={image[2].logo} alt="shorts logo" className="h-6 filter grayscale" />
              </div>
              <span className="text-xs">Shorts</span>
            </div>

            {/* Subscriptions */}
            <div className="flex flex-col  sm:mb-5 items-center relative left-2 sm:hidden md:hidden">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 text-2xl hover:text-red-600">
                <FontAwesomeIcon icon={faCirclePlus} />
              </div>
            </div>

            {/* Library */}
            <div className="flex flex-col  sm:mb-5 items-center md:mb-5">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                <FontAwesomeIcon icon={faThList} className="text-base" />
              </div>
              <span className="text-xs">Subscriptions</span>
            </div>

            {/* Account */}
            <Link to={'/you'}>
              <div className="flex flex-col   items-center">
                <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                  <FontAwesomeIcon icon={faUserCircle} className="text-base" />
                </div>
                <button className="text-xs">You</button>
              </div>
            </Link>

          </div>
        </div>
      )}

      {/* for large screen  */}
      {location.pathname === '/you' && (
        <div className="  hidden sm:block  md:block   fixed top-0 left-0 z-50 md:z-30 sm:z-30  right-0 bg-white   shadow-lg border-t border-gray-300">
          <div className="flex justify-around  sm:flex-col sm:absolute sm:left-0 sm:top-28 md:flex-col md:absolute md:left-0 md:top-28 px-2  ">
            {/* Home */}
            <Link to={'/'}>
              <div className="flex flex-col sm:mb-5  pb-2 items-center md:mb-5">
                <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                  <FontAwesomeIcon icon={faHome} className="text-base" />
                </div>
                <button className="text-xs">Home</button>
              </div>
            </Link>

            {/* Shorts */}
            <div className="flex flex-col  sm:mb-5 items-center md:mb-5">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                <img src={image[2].logo} alt="shorts logo" className="h-6 filter grayscale" />
              </div>
              <span className="text-xs">Shorts</span>
            </div>

            {/* Subscriptions */}
            <div className="flex flex-col  sm:mb-5 items-center relative left-2 sm:hidden md:hidden">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 text-2xl hover:text-red-600">
                <FontAwesomeIcon icon={faCirclePlus} />
              </div>
            </div>

            {/* Library */}
            <div className="flex flex-col  sm:mb-5 items-center md:mb-5">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                <FontAwesomeIcon icon={faThList} className="text-base" />
              </div>
              <span className="text-xs">Subscriptions</span>
            </div>

            {/* Account */}
            <Link to={'/you'}>
              <div className="flex flex-col   items-center">
                <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                  <FontAwesomeIcon icon={faUserCircle} className="text-base" />
                </div>
                <button className="text-xs">You</button>
              </div>
            </Link>

          </div>
        </div>
      )}
      {/* for large screen  */}
      {location.pathname === '/channelpage' && (
        <div className="  hidden sm:block md:block   fixed top-0 left-0 z-50 md:z-30 sm:z-30  right-0 bg-white   shadow-lg border-t border-gray-300">
          <div className="flex justify-around  sm:flex-col sm:absolute sm:left-0 sm:top-28 md:flex-col md:absolute md:left-0 md:top-28 px-2  ">
            {/* Home */}
            <Link to={'/'}>
              <div className="flex flex-col sm:mb-5  pb-2 items-center md:mb-5">
                <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                  <FontAwesomeIcon icon={faHome} className="text-base" />
                </div>
                <button className="text-xs">Home</button>
              </div>
            </Link>

            {/* Shorts */}
            <div className="flex flex-col  sm:mb-5 items-center md:mb-5">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                <img src={image[2].logo} alt="shorts logo" className="h-6 filter grayscale" />
              </div>
              <span className="text-xs">Shorts</span>
            </div>

            {/* Subscriptions */}
            <div className="flex flex-col  sm:mb-5 items-center relative left-2 sm:hidden md:hidden">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 text-2xl hover:text-red-600">
                <FontAwesomeIcon icon={faCirclePlus} />
              </div>
            </div>

            {/* Library */}
            <div className="flex flex-col  sm:mb-5 items-center md:mb-5">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                <FontAwesomeIcon icon={faThList} className="text-base" />
              </div>
              <span className="text-xs">Subscriptions</span>
            </div>

            {/* Account */}
            <Link to={'/you'}>
              <div className="flex flex-col   items-center">
                <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                  <FontAwesomeIcon icon={faUserCircle} className="text-base" />
                </div>
                <button className="text-xs">You</button>
              </div>
            </Link>

          </div>
        </div>
      )}

      {/* for large screen  */}
      {location.pathname === '/videoplayer' && (
        <div className="  hidden sm:block  md:block   fixed top-0 left-0 z-50 md:z-30 sm:z-30  right-0 bg-white   shadow-lg border-t border-gray-300">
          <div className="flex justify-around  sm:flex-col sm:absolute sm:left-0 sm:top-28 md:flex-col md:absolute md:left-0 md:top-28 px-2  ">
            {/* Home */}
            <Link to={'/'}>
              <div className="flex flex-col sm:mb-5  pb-2 items-center md:mb-5">
                <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                  <FontAwesomeIcon icon={faHome} className="text-base" />
                </div>
                <button className="text-xs">Home</button>
              </div>
            </Link>

            {/* Shorts */}
            <div className="flex flex-col  sm:mb-5 items-center md:mb-5">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                <img src={image[2].logo} alt="shorts logo" className="h-6 filter grayscale" />
              </div>
              <span className="text-xs">Shorts</span>
            </div>

            {/* Subscriptions */}
            <div className="flex flex-col  sm:mb-5 items-center relative left-2 sm:hidden md:hidden">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 text-2xl hover:text-red-600">
                <FontAwesomeIcon icon={faCirclePlus} />
              </div>
            </div>

            {/* Library */}
            <div className="flex flex-col  sm:mb-5 items-center md:mb-5">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                <FontAwesomeIcon icon={faThList} className="text-base" />
              </div>
              <span className="text-xs">Subscriptions</span>
            </div>

            {/* Account */}
            <Link to={'/you'}>
              <div className="flex flex-col   items-center">
                <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                  <FontAwesomeIcon icon={faUserCircle} className="text-base" />
                </div>
                <button className="text-xs">You</button>
              </div>
            </Link>

          </div>
        </div>
      )}

      {/* bottom nav show on signup page for small screen*/}
      {location.pathname === '/signup' && (
        <div className="  md:hidden block fixed bottom-0 left-0 z-50 md:z-30  right-0 bg-white md:relative shadow-lg border-t border-gray-300">
          <div className="flex justify-around md:flex-col md:absolute md:left-0 md:top-28 px-2">
            {/* Home */}
            <Link to={'/'}>
              <div className="flex flex-col pb-2 items-center md:mb-5">
                <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                  <FontAwesomeIcon icon={faHome} className="text-base" />
                </div>
                <button className="text-xs">Home</button>
              </div>
            </Link>

            {/* Shorts */}
            <div className="flex flex-col items-center md:mb-5">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                <img src={image[2].logo} alt="shorts logo" className="h-6 filter grayscale" />
              </div>
              <span className="text-xs">Shorts</span>
            </div>

            {/* Subscriptions */}
            <div className="flex flex-col items-center relative left-2 md:hidden">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 text-2xl hover:text-red-600">
                <FontAwesomeIcon icon={faCirclePlus} />
              </div>
            </div>

            {/* Library */}
            <div className="flex flex-col items-center md:mb-5">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                <FontAwesomeIcon icon={faThList} className="text-base" />
              </div>
              <span className="text-xs">Subscriptions</span>
            </div>

            {/* Account */}
            <Link to={'/you'}>
              <div className="flex flex-col items-center">
                <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                  <FontAwesomeIcon icon={faUserCircle} className="text-base" />
                </div>
                <button className="text-xs">You</button>
              </div>
            </Link>

          </div>
        </div>
      )}

      {/* bottom nav show when right side page open page for small screen*/}
      {<RightSidebar /> && (
        <div className=" md:hidden block fixed bottom-0 left-0 z-50 md:z-30  right-0 bg-white md:relative shadow-lg border-t border-gray-300">
          <div className="flex justify-around md:flex-col md:absolute md:left-0 md:top-28 px-2">
            {/* Home */}
            <Link to={'/'}>
              <div className="flex flex-col pb-2 items-center md:mb-5">
                <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                  <FontAwesomeIcon icon={faHome} className="text-base" />
                </div>
                <button className="text-xs">Home</button>
              </div>
            </Link>

            {/* Shorts */}
            <div className="flex flex-col items-center md:mb-5">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                <img src={image[2].logo} alt="shorts logo" className="h-6 filter grayscale" />
              </div>
              <span className="text-xs">Shorts</span>
            </div>

            {/* Subscriptions */}
            <div className="flex flex-col items-center relative left-2 md:hidden">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 text-2xl hover:text-red-600">
                <FontAwesomeIcon icon={faCirclePlus} />
              </div>
            </div>

            {/* Library */}
            <div className="flex flex-col items-center md:mb-5">
              <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                <FontAwesomeIcon icon={faThList} className="text-base" />
              </div>
              <span className="text-xs">Subscriptions</span>
            </div>

            {/* Account */}
            <Link to={'/you'}>
              <div className="flex flex-col items-center">
                <div className="rounded-full hover:bg-gray-200 transition-colors duration-200 hover:text-red-600">
                  <FontAwesomeIcon icon={faUserCircle} className="text-base" />
                </div>
                <button className="text-xs">You</button>
              </div>
            </Link>

          </div>
        </div>
      )}

    </>
  );
}

export default BottomNavigation;
