# YouTube Clone Project

This is a YouTube clone project built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to view and interact with videos, including features like comments, likes, and user authentication.

# YouTube Clone Project

## Table of Contents
- [Objective](#objective)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Conclusion](#Conclusion)
 

 ## Objective

The project aims to help users understand how to build a full-stack real-world application using the MERN stack. It includes front-end and back-end components, responsive design, user authentication, and interactive video features.


## Features

### Frontend

- **React.js**: React is used as the JavaScript library for the frontend.
  
- **Home Page**:
  - YouTube-like header with a static sidebar that toggles from a hamburger menu.
  - A grid of video thumbnails displaying the title, thumbnail, channel name, and view count.

- **User Authentication**:
  - Register and log in using JWT for secure authentication.
  - After signing in, the user's name appears in the header.
  

- **Search and Filter**:
  - A search bar on the homepage filters videos based on title.
  - Filter videos by category using filter buttons.

- **Video Player Page**:
  - Displays the selected video with player controls.
  - Includes like and dislike buttons, as well as a comment section.
  - Users can add, edit, and delete comments.

- **Channel Page**:
  - Provides an option to create a channel after user login.
  - Displays videos specific to the user’s channel.
  

- **Responsive Design**:
  - Optimized for desktop, tablet, and mobile devices.
 
  ### Backend

- **Node.js and Express.js**: The backend is built with Express.js and Node.js for handling API requests and data operations.

- **User Authentication**:
  - Sign up, login, and JWT-based authentication to protect routes.


- **Comment Management**:
  - APIs to add and fetch comments for each video.

- **Channel Management**:
  - APIs to create new channels, fetch channel details
 
  ## Tech Stack

### Frontend
- **React**: JavaScript library for building UI.
- **Redux**: State management for global data handling.
- **Axios**: HTTP client for making API calls.
- **React Router**: For navigation and routing.

### Backend
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for creating API routes.
- **MongoDB**: NoSQL database to store users, videos, channels, and comments.
- **JWT**: For secure user authentication.

## Installation

### Prerequisites
Ensure the following are installed:
- **Node.js**
- **MongoDB**
- **npm**: Node package manager.
- **Git**: For version control.

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/meghraj-dewangan/youtube-clone.git

   cd youtube-clone/backend

- npm install

- PORT=3700

- npm run dev


### Frontend Setup

1. **Navigate to the frontend folder**:
   ```bash
   cd youtube-clone/frontend

  - npm install

- npm start

 ## API Endpoints

### User Routes
- **POST /auth/register**: Registers a new user.
- **POST /auth/login**: Authenticates a user and returns a JWT token.
- **GET /auth/getuser/:email**: Retrieves the username associated with the given email.
- **GET /auth/getuserdetail/:email**: Fetches detailed user information by email.
- **GET /auth/getuserdetailall**: Retrieves a list of all users.

### Video Routes
- **POST /youtube/video**: Adds a new video.
- **GET /youtube/video**: Retrieves all videos.
- **GET /youtube/video/:id**: Fetches a video by its ID.
- **GET /youtube/video/relatedcategory/:id**: Gets related videos based on the category of a specific video ID.
- **GET /youtube/video/category/:category**: Retrieves videos filtered by category.
- **GET /youtube/video/category**: Fetches all distinct video categories.
- **GET /youtube/video/videobychannel/:id**: Gets all videos associated with a specific channel.
- **GET /youtube/video/search/:title**: Searches for videos by title.

### Shorts Routes
- **POST /youtube/shorts**: Adds a new short video.
- **GET /youtube/shorts**: Retrieves all short videos.
- **GET /youtube/shorts/:id**: Fetches a short video by its ID.
- **GET /youtube/shortsbychannel/:id**: Retrieves short videos associated with a specific channel.

### Channel Routes
- **POST /youtube/channel**: Creates a new channel.
- **GET /youtube/channel/:channelId**: Fetches channel data by channel ID.
- **GET /youtube/channel/channeldetail**: Retrieves detailed information about the channel.
- **GET /youtube/channel/user/:owner**: Gets a channel by the user ID of the owner.
- **GET /youtube/channel/video/:videoId**: Retrieves a channel based on a specific video ID.

### Comment Routes
- **POST /comment/addcomment/:videoId/comments**: Adds a new comment to a video.
- **PUT /comment/updatecomment/:videoId/comments**: Updates an existing comment on a video.
- **DELETE /comment/deletecomment/:videoId/comments**: Deletes a comment from a video.

### Like/Dislike Routes
- **POST /youtube/video/like/:videoId**: Likes a video.
- **POST /youtube/video/dislike/:videoId**: Dislikes a video.

  

## Conclusion

The YouTube clone project demonstrates building a full web application using the MERN stack. It features user authentication, video management, and interactivity, providing a real video-sharing experience.

This project is an excellent way to learn full-stack development, offering hands-on experience with front-end and back-end technologies. The responsive design ensures usability across devices.

Explore and enhance this foundation to add your unique features. Happy coding!

