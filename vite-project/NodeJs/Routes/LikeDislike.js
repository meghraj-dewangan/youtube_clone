import { likeVideo, dislikeVideo } from "../Controller/LikeDislike.js";
import express from 'express';

const likeDislike = express.Router();

likeDislike.post('/video/like/:videoId',likeVideo);
likeDislike.post('/video/dislike/:videoId',dislikeVideo);


export default likeDislike;