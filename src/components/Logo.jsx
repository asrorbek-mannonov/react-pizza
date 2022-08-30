import React from 'react';

function Logo() {
  return (
    <div className="header__logo">
      <img width="38" src="/pizza-logo.svg" alt="Pizza logo" />
      <div>
        <h1>React Pizza</h1>
        <p>самая вкусная пицца во вселенной</p>
      </div>
    </div>
  );
}

export default Logo;
