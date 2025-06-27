import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footerTop">
        <div>
          <i className="fa-solid fa-copyright"></i> Copyright 2024. Atma AutoBid
        </div>
      </div>
      <hr />
      <div className="footerBot">
        <div className="footerBotNav">
          <a href="/">Home</a>
          <a href="/information">About</a>
          <a href="/information">Contact</a>
        </div>
        <div className="footerBotSocial">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-linkedin"></i>
          <i className="fa-brands fa-youtube"></i>
          <i className="fa-brands fa-x-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
        </div>
      </div>

      <style>{`
        footer {
          height: 150px;
          width: 100%;
          background-color: #000;
          color: white;
          margin: 0;
          overflow: hidden;
        }

        .footerTop {
          width: 100%;
          height: 60%;
          display: flex;
          justify-content: baseline;
          align-items: end;
          padding-left: 3%;
        }

        .footerBot {
          width: 100%;
          height: 40%;
          margin: 0;
          display: flex;
          justify-content: space-between;
        }

        footer hr {
          border: none;
          height: 1px;
          background-color: white;
          opacity: 0.7;
          margin: 10px 0;
        }

        .footerBotNav {
          margin-left: 5%;
          display: flex;
          gap: 8%;
        }

        .footerBotNav a {
          text-decoration: none;
          color: white;
        }

        .footerBotSocial {
          display: flex;
          gap: 20%;
          margin-right: 5%;
          margin-top: 6px;
        }

        .footerBotNav a:visited {
          text-decoration: none;
          color: white;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
