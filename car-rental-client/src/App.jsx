import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Cars from './pages/Cars';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookCar from './pages/BookCar';
import Payment from './pages/Payment';
import PrivateRoute from './components/PrivateRoute';
import MyBookings from './pages/MyBookings';

function App() {
  return (
    <div className="app-root d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/cars"
            element={
              <PrivateRoute>
                <Cars />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<BookCar />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;