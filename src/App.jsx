import React, {useEffect} from 'react';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import RegisterUserForm from './pages/register';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/register' element={<RegisterUserForm />} ></Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
