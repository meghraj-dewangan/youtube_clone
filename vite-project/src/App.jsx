import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import './App.css';
import BottomNavigation from './Components/Bottom';
import { UserAuthProvider } from './Components/UserContext';


function App() {



  return (
    <div  >
      <UserAuthProvider>    {/* Wrap the app with UserAuthProvider */}
        <Header />

        <Outlet />

        <BottomNavigation />

        <Footer />

      </UserAuthProvider>




    </div>
  )
}

export default App
