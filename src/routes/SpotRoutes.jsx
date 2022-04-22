import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/home/Home';
import AuthLogin from '../pages/auth/AuthLogin';
import HeaderSpot from '../component/HeaderSpot';

export default function SpotRouter() {
  const { token } = useSelector((state) => state.auth);

  return (
    // <Routes>
    //   {/* <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
    //   <Route
    //     path="/"
    //     element={token ? <Navigate to="/home" /> : <AuthLogin />}
    //   />
    // </Routes> */}
    <Routes>
      <Route
        path="/home"
        element={token ? <HeaderSpot /> : <Navigate to="/" replace />}
      >
        <Route index element={<Home />} />
      </Route>
      <Route
        path="/"
        element={token ? <Navigate to="/home" /> : <AuthLogin />}
      />
    </Routes>
  );
}
