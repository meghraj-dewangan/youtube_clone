


function ShortsCard({shorts}) {
   
    return (
        
          <div className="relative sm:relative sm:mb-14 w-full h-72 sm:h-96 mb-3 mt-4  " >
            {/* Video iframe */}
            <img 
            src={shorts.thumbnailUrl} // Use the thumbnail URL from the video object
            alt={shorts.title}
            className="absolute rounded-lg top-0 left-0 w-full h-full  object-cover"
            style={{ borderRadius: '8px' }} 
          />

            {/* Video title */}
            <div className="absolute  bottom-2 left-2 sm:-bottom-20    text-xs  font-normal sm:font-bold text-white sm:text-black   px-2 py-1 rounded-lg">
                <p>{shorts.title}</p>
                <p className="text-gray-500 hidden sm:block sm:mt-1">{shorts.views} views</p>
            </div>
        </div>
    );
}

export default ShortsCard;
