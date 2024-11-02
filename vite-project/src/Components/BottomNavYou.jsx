import { image } from "../Utils/images";
import BottomNavYouCard from "./BottomNavYouCard";
import { faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBell, faDownload, faSignOutAlt, faUser, faVideo, faShoppingCart, faChartSimple, faUserCircle, faDollarSign, faFileAlt, faKeyboard, faShield, faQuestionCircle, faCommentDots, faFilm, faMoon, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useUserAuth } from "./UserContext";
import SignInRegister from "./Signup";
import { Link } from "react-router-dom";
import CreateChannelForm from "./CreateChannelForm";
import UseFetch from "./UseFetch";
import { useEffect, useState } from "react";
import axios from "axios";
import BlankPage from "./BlankPage";
import { useNavigate } from "react-router-dom";

function BottomNavYou() {
    const [regularVideos, setRegularVideos] = useState([]);
    const [userDetail, setUserDetail] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authenticated, handleLogout,userData } = useUserAuth();
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

   

    // Fetch user details
    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');

        const getUserDetailsById = async () => {
            if (!storedEmail) return;

            try {
                const response = await axios.get(`http://localhost:3700/auth/getuserdetail/${storedEmail}`);
                setUserDetail(response.data);
                console.log( setUserDetail(response.data))
                console.log("Fetched User Details:", response.data);
            } catch (error) {
                console.error("Error fetching user details:", error.response?.data || error.message);
            }
        };

        getUserDetailsById();
    }, []); // Run only on mount

    useEffect(() => {
        const fetchRegularVideos = async () => {
            try {
                setLoading(true); // Start loading
                const response = await axios.get('http://localhost:3700/youtube/video');
                setRegularVideos(response.data); // Assuming the response data is an array of video objects
            } catch (error) {
                console.log("Error fetching regular videos:", error);
                setError(error); // Store error in state
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchRegularVideos();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading videos: {error.message}</p>;

    return (
        <>
            {!authenticated ? (
                <BlankPage />
            ) : (
                <div className="w-full mt-28">
                    <div className="mt-10 sm:ml-20 mx-1 sm:px-8 lg:px-20">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0">
                            {/* Profile Image */}
                            <div>
                                {userData.avatar?  (
                                    <img src={userData.avatar} alt="Profile" className="h-16 sm:h-20 md:h-24 lg:h-28 rounded-full" />
                                ) : (
                                    <p>No avatar available</p> 
                                )}
                            </div>
                            {/* User Information */}
                            <div className="flex flex-col items-center sm:items-start space-y-1 sm:space-y-2">
                                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{userDetail.username}</h1>
                                <div className="text-gray-600 text-sm sm:text-base lg:text-lg">
                                    <p className="inline mr-2">{userDetail.email}</p>
                                    <Link to={"/channelform"}>
                                        <span className="text-xs">{userDetail.channel ? "• View Channel" : "• Create Channel"}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Account Options */}
                        <div className="mt-6 flex w-full p-0 overflow-x-auto overscroll-x-auto justify-center sm:justify-start space-x-2">
                            <button className="bg-gray-200 px-3 py-1 text-xs rounded-lg hover:bg-gray-300">
                                <FontAwesomeIcon icon={faUserCircle} className="text-xl mr-2 lg:text-2xl" /> Switch Account
                            </button>
                            <button className="bg-gray-200 px-3 py-1 text-xs rounded-lg hover:bg-gray-300">
                                <FontAwesomeIcon icon={faGoogle} className="mr-2 text-xl lg:text-2xl" /> Google Account
                            </button>
                        </div>

                        {/* History Section */}
                        <div className="mt-8 text-left sm:text-left">
                            <h2 className="text-base font-semibold sm:font-bold">History</h2>
                        </div>
                        <div className="w-full overflow-x-auto whitespace-nowrap py-1 px-2">
                            <div className="flex space-x-2 mb-14">
                                {regularVideos.map((video) => (
                                    <BottomNavYouCard key={video._id} video={video} />
                                ))}
                            </div>
                        </div>

                        {/* Playlist Section */}
                        <div className="mt-8 text-left sm:text-left">
                            <h2 className="text-base font-semibold sm:font-bold">Playlist</h2>
                        </div>
                        <div className="w-full overflow-x-auto whitespace-nowrap py-1 px-2">
                            <div className="flex space-x-2 mb-14">
                                {regularVideos.map((video) => (
                                    <BottomNavYouCard key={video._id} video={video} />
                                ))}
                            </div>
                        </div>

                        {/* Watch Later Section */}
                        <div className="mt-8 text-left sm:text-left">
                            <h2 className="text-base font-semibold sm:font-bold">Watch Later</h2>
                        </div>
                        <div className="w-full overflow-x-auto whitespace-nowrap py-1 px-2">
                            <div className="flex space-x-2 mb-14">
                                {regularVideos.map((video) => (
                                    <BottomNavYouCard key={video._id} video={video} />
                                ))}
                            </div>
                        </div>

                        {/* Liked Videos Section */}
                        <div>
                            <div className="mt-8 text-left sm:text-left">
                                <h2 className="text-base font-semibold sm:font-bold">Liked Videos</h2>
                            </div>
                            <div className="sm:mb-20 overflow-x-auto grid grid-rows-1 py-1 px-2">
                                <div className="flex space-x-2 mb-6">
                                    {regularVideos.map((video) => (
                                        <BottomNavYouCard key={video._id} video={video} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Additional Options for Smaller Screens */}
                        <div className="sm:hidden">
                            <div className="mt-8 text-left sm:text-left">
                                <h2 className="text-base font-light sm:font-bold">
                                    <FontAwesomeIcon icon={faYoutube} className="mr-2" /> Your Videos
                                </h2>
                            </div>
                            <div className="mb-3">
                                <h2 className="text-base font-light sm:font-bold">
                                    <FontAwesomeIcon icon={faDownload} className="mr-2" /> Downloads
                                </h2>
                            </div>
                            <hr />
                            <div className="mt-8 text-left sm:text-left">
                                <h2 className="text-base font-light sm:font-bold">
                                    <FontAwesomeIcon icon={faFilm} className="mr-2" /> Your Movies
                                </h2>
                            </div>
                            <div className="mb-3">
                                <h2 className="text-base font-light sm:font-bold">
                                    <FontAwesomeIcon icon={faYoutube} className="mr-2" /> Get YouTube Premium
                                </h2>
                            </div>
                            <hr />
                            <div className="mt-8 text-left sm:text-left">
                                <h2 className="text-base font-light sm:font-bold">
                                    <FontAwesomeIcon icon={faChartSimple} className="mr-2" /> Time Watched
                                </h2>
                            </div>
                            <div className="mb-16">
                                <h2 className="text-base font-light sm:font-bold">
                                    <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> Help and Feedback
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BottomNavYou;
