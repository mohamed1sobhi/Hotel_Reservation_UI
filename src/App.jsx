 
import React, {useEffect} from 'react'
import Home from './pages/Home'
import All_hotels from  './pages/Hotel/All_hotels'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RoomsPage from './pages/Hotel/Rooms'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/hotels' element={< All_hotels />} ></Route>
      <Route path="/hotels/:hotelId/rooms" element={<RoomsPage/>} />
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
