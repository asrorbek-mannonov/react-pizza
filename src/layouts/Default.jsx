import React from 'react';
import Logo from '../components/Logo';
import CartButton from '../components/CartButton';
import Search from '../components/Search';
import { Route, Routes } from 'react-router-dom';

import Cart from '../pages/Cart';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const Default = () => {
  return (
    <div className="wrapper">
      <div className="header">
        <div className="container">
          <Logo />
          <Search />
          <CartButton />
        </div>
      </div>
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Default;
