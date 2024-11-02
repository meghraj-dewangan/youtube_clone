
import express from "express";
import { addShorts,getAllShorts,getShortsByChannelId,getShortsById } from "../Controller/Shorts.js";


const shortsrouter = express.Router();

shortsrouter.post("/shorts",addShorts);
shortsrouter.get("/shorts",getAllShorts);
shortsrouter.get("/shorts/:id",getShortsById);
shortsrouter.get("/shortsbychannel/:id",getShortsByChannelId)






export default shortsrouter;
