import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom' ;
import VideoCard from "./VideoCard";
import axios from 'axios';


function FilterPage(){
    const {category} = useParams();
    const [videos, setVideos] = useState([]);

    async function fetchFilteredData(){
        try{
            const response = await axios.get(`http://localhost:3700/youtube/video/category/${category}`);
            setVideos(response.data);
        }catch(error){
            console.log(error.message);
        }
        
    }

    useEffect(()=>{
        fetchFilteredData();
    },[category])

    return(
        <div className="mb-14 mt-24 mx-5 sm:mb-20 overflow-x-hidden">
  
        {/* Regular Videos Section */}
        <div className="grid gap-3 mt-9 grid-cols-1 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    )
};

export default FilterPage;