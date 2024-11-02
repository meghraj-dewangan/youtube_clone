import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import VideoCard from "./VideoCard";
import axios from 'axios';
import { image } from "../Utils/images.js";


function Search() {
  const { input: title } = useParams();
  const [videos, setVideos] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  async function fetchSearchData() {
    try {
      const response = await axios.get(`http://localhost:3700/youtube/video/search/${title}`);
      setVideos(response.data);
      setErrorMsg('');
    } catch (error) {
      console.log("Error fetching search data:", error.message);
      setErrorMsg(error.response && error.response.status === 404 ? 'No videos found for this search.' : 'Something went wrong. Please try again later.');
    }

  }

  useEffect(() => {
    fetchSearchData();
  }, [title])

  return (
    <div className="mb-14 mt-20 mx-5 sm:mb-20 overflow-x-hidden">

      {/*  Videos Section */}
      {
        errorMsg ? (
          <div className="text-center mt-10">
         
          { <img src={image[7].logo} alt="Error" className="mx-auto mb-4" />}
          <p className="text-red-600 font-semibold">{errorMsg}</p>
      </div>

        ) : (
          <div className="grid gap-3 mt-9 grid-cols-1 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )
      }
    </div>
  )
};

export default Search;