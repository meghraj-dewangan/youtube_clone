import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import NotFound from './Components/NotFound.jsx';
import App from './App.jsx';
import './index.css';
import CreateChannelForm from './Components/CreateChannelForm.jsx';
import BlankPage from './Components/BlankPage.jsx';






// Lazy load components

const Body = lazy(() => import('./Components/Body.jsx'));
const VideoPlayer = lazy(() => import('./Components/VideoPlayer.jsx'));
const ChannelPage = lazy(() => import('./Components/ChannelPage.jsx'));
const BottomNavYou = lazy(() => import('./Components/BottomNavYou.jsx'));
const SignInRegister = lazy(() => import('./Components/Signup.jsx'));
const Search = lazy(() => import('./Components/Search.jsx'));
const FilterPage = lazy(() => import('./Components/FilterPage.jsx'));
const appRouter = createBrowserRouter([

  {

    path: "/",
    element: <App />,

    children: [

      {
        path: '',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Body />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<div>Loading SignIn/Register...</div>}>
            <SignInRegister />
          </Suspense>
        ),
      },

      {
        path: "/blank",
        element: <BlankPage/>
         
        
      },
      {
        path: "/channelpage/:channelId",
        element: (
          <Suspense fallback={<div>Loading Channel Page...</div>}>
            <ChannelPage />
          </Suspense>
        ),
      },

     


      {
        path: "/videoplayer/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
          <VideoPlayer />
        </Suspense>
      )
         
        
      },
      {
        path: "/channelform",
        element: <CreateChannelForm/>
         
        
      },
      {
        path: "/you",
        element: (
          <Suspense fallback={<div>Loading Bottom Navigation...</div>}>
            <BottomNavYou />
          </Suspense>
        ),
      },
      
      {
        path: "/search/:input",
        element: (
          <Suspense fallback={<div>Loading Search...</div>}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "/filter/:category",
        element: (
          <Suspense fallback={<div>Loading Filter...</div>}>
            <FilterPage />
          </Suspense>
        ),
      },
    ],
    errorElement: <NotFound />

  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
