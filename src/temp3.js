import React from 'react';

function Footer() {
  return (
    <section className="footer">
      <section>
        <img src="./images/logo.svg" alt="Logo" className="footericon" />
        <section className="footerbottom">
          <section className="location">
            <img src="./images/icon-location.svg" alt="Location Icon" className="locationicon" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua
            </p>
          </section>
          <section className="infohub">
            <section className="info">
              <img src="./images/icon-phone.svg" alt="Phone Icon" className="infoicon" />
              <p>+1-543-123-4567</p>
            </section>
            <section className="info secondinfo">
              <img src="./images/icon-email.svg" alt="Email Icon" className="infoicon" />
              <p>example@fylo.com</p>
            </section>
          </section>
          <section className="navmenu">
            <ul>
              <li className="navitembottom">About Us</li>
              <li className="navitembottom">Jobs</li>
              <li className="navitembottom">Press</li>
              <li className="navitembottom">Blog</li>
            </ul>
          </section>
          <section className="navmenu secondnavmenu">
            <ul>
              <li className="navitembottom">Contact Us</li>
              <li className="navitembottom">Terms</li>
              <li className="navitembottom">Privacy</li>
            </ul>
          </section>
          <section className="sociallinks">
            <img alt="Facebook" src="./images/facebook.png" className="icons" />
            <img alt="Twitter" src="./images/twitter.png" className="icons" />
            <img alt="Instagram" src="./images/instagram.png" className="icons" />
          </section>
        </section>
      </section>
    </section>
  );
}

export default Footer;
