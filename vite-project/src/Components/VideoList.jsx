import VideoCard from "./VideoCard";
import ShortsCard from "./ShortsCard";
import { image } from "../Utils/images";
import { useState, useEffect } from "react";
import axios from "axios";

function VideoList() {
  const [shortsVideos, setShortsVideos] = useState([]);
  const [regularVideos, setRegularVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedShortsCount, setDisplayedShortsCount] = useState(6);

  const url = 'http://localhost:3700/youtube/video';

  // Shuffle function to randomize the order of videos
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  // Adjust displayed shorts based on screen width
  const updateDisplayedVideos = () => {
    if (window.innerWidth >= 1280) {
      setDisplayedShortsCount(6);
    } else if (window.innerWidth >= 1024) {
      setDisplayedShortsCount(6);
    } else if (window.innerWidth >= 640) {
      setDisplayedShortsCount(3);
    } else {
      setDisplayedShortsCount(2);
    }
  };

  // Fetch videos on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        // Shuffle the fetched regular videos
        const shuffledRegularVideos = shuffleArray(response.data);
        setRegularVideos(shuffledRegularVideos);

        const response1 = await axios.get('http://localhost:3700/youtube/shorts');
        // Shuffle the fetched shorts videos
        const shuffledShortsVideos = shuffleArray(response1.data);
        setShortsVideos(shuffledShortsVideos);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    updateDisplayedVideos(); // Set initial count based on current screen width
    window.addEventListener("resize", updateDisplayedVideos);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", updateDisplayedVideos);
  }, [url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mb-16  sm:mb-20 overflow-x-hidden">
      {/* Shorts Section */}
      <img className="h-8 inline" src={image[2].logo} alt="shorts logo" />
      <h2 className="text-lg inline font-semibold mb-8">Shorts</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mt-8">
        {shortsVideos.slice(0, displayedShortsCount).map((shorts) => (
          <ShortsCard key={shorts._id} shorts={shorts} />
        ))}
      </div>

      {/* Regular Videos Section */}
      <div className="grid gap-3 mt-9 grid-cols-1 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {regularVideos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default VideoList;
