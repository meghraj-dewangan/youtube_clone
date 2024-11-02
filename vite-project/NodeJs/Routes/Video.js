
import express from "express";
import { addVideo,getAllVideos,getVideoById,getRelatedVideosByCategory, getVideoByTitle, getVideosByCategory,getAllCategories,getVideosByChannelId  } from "../Controller/Video.js";


const videorouter = express.Router();

videorouter.post("/video",addVideo);
videorouter.get("/video",getAllVideos);
videorouter.get("/video/:id",getVideoById);
videorouter.get("/video/relatedcategory/:id",getRelatedVideosByCategory ); // Route to get related videos by category based on video ID
videorouter.get("/video/category/:category", getVideosByCategory);        // Route to get videos by category
videorouter.get("/video/category",getAllCategories) ;             // Route to get all distinct categories
videorouter.get("/video/videobychannel/:id",getVideosByChannelId) ;  
videorouter.get("/video/search/:title", getVideoByTitle);   //route for searching by title





export default videorouter;
