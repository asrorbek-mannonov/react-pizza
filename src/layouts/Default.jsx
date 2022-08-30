import React from 'react';
import Cart from '../components/Cart';
import Logo from '../components/Logo';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const Default = () => {
  return (
    <div className="wrapper">
      <div className="header">
        <div className="container">
          <Logo />
          <Cart />
        </div>
      </div>
      <div className="content">
        <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
      </div>
    </div>
  );
};

export default Default;
