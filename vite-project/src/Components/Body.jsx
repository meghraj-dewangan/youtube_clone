import React from "react";
import VideoList from "./VideoList";
import { Link } from "react-router-dom";





function Body() {
   return (
      <div className="mt-28">
      <div className=" h-max  xl:ml-24 sm:ml-24 ">

         <div className=" sm:left-32 md:left-32 w-full ">
            <div className="mb-5  " >
               <ul className="flex space-x-2  p-2 text-sm overflow-x-auto text-black  rounded-lg">
                  <Link to='/'><li className="cursor-pointer px-4 bg-gray-200 rounded-md  hover:bg-gray-300 ">All</li></Link>
                  <Link to={`/filter/Education`}><li className="cursor-pointer px-4 bg-gray-200 rounded-md hover:bg-gray-300">Education</li></Link>
                  <Link to={`/filter/Music`}><li className="cursor-pointer px-4 bg-gray-200 rounded-md hover:bg-gray-300">Music</li></Link>
                 <Link to={`/filter/News`}> <li className="cursor-pointer px-4 bg-gray-200 rounded-md hover:bg-gray-300">News</li></Link>
                 
               </ul>
            </div>
            <div className="mt-8">
               <VideoList />
            </div>




         </div>


      </div>
      </div>
   )
};

export default Body;