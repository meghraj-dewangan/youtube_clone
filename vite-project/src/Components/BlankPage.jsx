import React from "react";
import { Link } from "react-router-dom";

function BlankPage() {
    return (

        <>
        <div className="sm:mb-24">
            
        <div className="flex justify-center mt-44">
                <img src="src/Utils/image/you.png" alt="null image" />

            </div>
            <div className="flex justify-center ">
             <Link to="/signup"> <button className="text-lg font-bold text-white bg-gray-500 p-2 rounded-md hover:bg-slate-500 ">SignUp</button></Link>  
            </div>
        </div>

        </>
    )
}
export default BlankPage;