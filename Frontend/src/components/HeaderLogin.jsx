import React from 'react';
import logo from '../assets/images/logo.png';

const HeaderLogin = () => {
  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Logo" />
          </a>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(1px 1px 1px grey);
          background-color: white;
          padding: 0 20px;
          z-index: 1000;
        }

        .logo {
          width: 100px;
          height: 100%;
        }

        .logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transform: scale(2);
        }
      `}</style>
    </header>
  );
};

export default HeaderLogin;
