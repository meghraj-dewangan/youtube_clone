import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from 'cors';
import dotenv from 'dotenv'

import userrouter from "./Routes/User.js";
import videorouter from "./Routes/Video.js";
import shortsrouter from "./Routes/Shorts.js";
import channelrouter from "./Routes/Channel.js";
import commrouter from "./Routes/Comment.js";
import likeDislike from "./Routes/LikeDislike.js";

export const app = new express();

dotenv.config();

//Middleware to parse JSON bodies

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use((req, res, next) => {
    console.log(req.method);
    next();
})


// to connect mongodb compass

mongoose.connect("mongodb://localhost:27017/youtube_clone")



const db = mongoose.connection;

db.on("open", () => {
    console.log("Database connection is Succesfull")
});

db.on("error", () => {
    console.log("Database Connection is not Succesfull")
});


//Middleware for authenticating JWT token


export function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization'];    // Get the authorization header

    if (!authHeader) return res.status(403).json({ message: "Token is required" });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'SecretKey', (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;    // Attach user info from the decoded token to req object
        next();
    })
};


// routes
app.use("/auth", userrouter);
app.use("/youtube",videorouter);
app.use("/youtube",shortsrouter);
app.use("/youtube",channelrouter);
app.use("/comment",commrouter);
app.use("/youtube",likeDislike);


app.listen(process.env.Port || 3700, () => {
    console.log("Server is running on port 3700 ");
});
