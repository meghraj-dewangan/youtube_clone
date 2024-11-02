import express from "express";

import { createChannel,getChannelData,getChannelDetail,findChannelByUserId,getChannelByVideoId } from "../Controller/Channel.js";


const channelrouter = express.Router();

channelrouter.post("/channel",createChannel);
channelrouter.get("/channel/:channelId",getChannelData);
channelrouter.get("/channel/channeldetail",getChannelDetail);
channelrouter.get("/channel/user/:owner",findChannelByUserId);
channelrouter.get("/channel/video/:videoId",getChannelByVideoId);






export default channelrouter;
