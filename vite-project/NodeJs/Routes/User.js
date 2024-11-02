import express from "express";
import {register,logIn,getUsernameByEmail,getUserByEmail,getAllUsers} from "../Controller/User.js";




const userrouter = express.Router();

userrouter.post("/register",register);
userrouter.post("/login",logIn);
userrouter.get('/getuser/:email',getUsernameByEmail);
userrouter.get('/getuserdetail/:email',getUserByEmail);
userrouter.get('/getuserdetailall',getAllUsers)




export default userrouter;

