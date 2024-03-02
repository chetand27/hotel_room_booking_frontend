
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './CommonStyle.css';
import Header from '../Header/Index.js';
import Footer from '../Footer/Index.js';
import Home from '../Home/Index.js';
import Bookings from '../Bookings/Index.js';
import RoomBookingForm from '../RoomBookingForm/Index.js';

const App = () => {
  return (
    <div className="full_width_container">
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="hotels/:hotel_id/bookings/new" element={<RoomBookingForm />} />
          <Route path="bookings/:id/edit" element={<RoomBookingForm />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
