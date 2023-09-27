import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Cookies from 'js-cookie';
import Location from './Tracker/Location';
import axios from 'axios';
import DeviceInfo from './Tracker/DeviceInfo';
import Header from './Components/Header';
import DialogComponent from './Components/Dialog/DialogComponent'
import Repeat from './Components/Dialog/Repeat';
function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <DialogComponent />
        <Repeat />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
