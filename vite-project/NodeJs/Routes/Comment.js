import express from "express";

import { addComment,updateComment,deleteComment } from "../Controller/comment.js";
import { authenticateToken } from "../Server.js";


const commrouter = express.Router();


commrouter.post('/addcomment/:videoId/comments', addComment);
commrouter.put('/updatecomment/:videoId/comments',updateComment);
commrouter.delete('/deletecomment/:videoId/comments',deleteComment);


export default commrouter;