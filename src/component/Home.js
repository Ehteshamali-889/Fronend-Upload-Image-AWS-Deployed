import React from 'react'

import './Home.css';

import logo from '../images/logo.svg';
import illustration from '../images/illustration-intro.png';
import access from '../images/icon-access-anywhere.svg';
import security from '../images/icon-security.svg';
import collab from '../images/icon-collaboration.svg';
import file from '../images/icon-any-file.svg';

import productive from '../images/illustration-stay-productive.png';
import arrow from '../images/icon-arrow.svg';

import location from '../images/icon-location.svg';
import phone from '../images/icon-phone.svg';
import email from '../images/icon-email.svg';


import fb from '../images/facebook.png';
import twitter from '../images/twitter.png';
import insta from '../images/instagram.png';


import quote from '../images/bg-quotes.png';
import profile1 from '../images/profile-1.jpg';
import profile2 from '../images/profile-2.jpg';
import profile3 from '../images/profile-3.jpg';

import {auth,provider} from '../firebase';
import { signInWithPopup } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

import {FcGoogle} from 'react-icons/fc';
import { BsGoogle } from "react-icons/bs";
function Home() {
    const navigate=useNavigate();
    const loginWithGoogle=async()=>{
        await signInWithPopup(auth,provider);
        navigate("/account");
    }
  return (
    <>
      <main>
        <section className="header">
          <img src={logo} alt="Logo" />
          <ul className="nav">
            {/* <li>Features</li> */}
            {/* <li>Team</li> */}
            <li className='signin' onClick={loginWithGoogle}>Sign In <BsGoogle /></li>
          </ul>
        </section>
        <section className="intro">
          <img src={illustration} alt="Intro Illustration" />
          <h1 className="introheading">All your files in one secure location, accessible anywhere.</h1>
          <p className="introdesc">Fylo stores all your most important files in one secure location. Access them wherever
            you need, share and collaborate with friends, family, and co-workers.</p>
          <button className="btnget">Get Started</button>
        </section>
        <section className="highlight">
        </section>
        <section className="under">
          <section className="features">

            <section className="card">
              <img src={access} alt="Access anywhere icon" />
              <h1>Access your files, anywhere</h1>
              <p>The ability to use a smartphone, tablet, or computer to access your account means your files follow you everywhere.</p>
            </section>
            <section className="card second">
              <img src={security} alt="Security icon" />
              <h1>Security you can trust</h1>
              <p>2-factor authentication and user-controlled encryption are just a couple of the security features we allow to help secure your files.</p>
            </section>
            <section className="card">
              <img src={collab} alt="Collaboration icon" />
              <h1>Real-time collaboration</h1>
              <p>Securely share files and folders with friends, family, and colleagues for live collaboration. No email attachments required.</p>
            </section>
            <section className="card fourth">
              <img src={file} alt="Any file icon" />
              <h1>Store any type of file</h1>
              <p>Whether you're sharing holidays photos or work documents, Fylo has you covered allowing for all file types to be securely stored and shared.</p>
            </section>

          </section>
        </section>
        <section className="productive">
          <img src={productive} alt="Stay Productive" className="productiveimg" />
          <section className="secondproductive">
            <h1 className="productiveheading">
              Stay productive, wherever you are
            </h1>
            <p className="firstpara">Never let location be an issue when accessing your files. Fylo has you covered for all of your file
              storage needs.</p>
            <p className="firstpara">Securely share files and folders with friends, family and colleagues for live collaboration. No email
              attachments required.</p>
            <button className="workbtn">See how Fylo works <img src={arrow} alt="Arrow" /> </button>
          </section>
        </section>
        <section className="testimonials">
          <section className="started">
            <h1 className="startedheading">Get early access today</h1>
            <p className="startedpara">It only takes a minute to sign up and our free starter tier is extremely generous. If you have any questions, our support team would be happy to help you.</p>
            <section className="freeform">
              <input type="text" className="emailaccess" placeholder="email@example.com" />
              <button className="startedbtn">Get Started For Free</button>
            </section>
          </section>
          <img src={quote} className="quote" alt="quote" />
          <section className="client">
            <p className="comments">Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has become a well-oiled collaboration machine.</p>
            <section className="bottomclient">
              <img src={profile1} alt="profile" />
              <section>
                <h1>Satish Patel</h1>
                <p>Founder & CEO, Huddle</p>
              </section>
            </section>
          </section>

          <section className="client">
            <p className="comments">Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has become a well-oiled collaboration machine.</p>
            <section className="bottomclient">
              <img src={profile2} alt="profile" />
              <section>
                <h1>Bruce McKenzie</h1>
                <p>Founder & CEO, Huddle</p>
              </section>
            </section>
          </section>

          <section className="client">
            <p className="comments">Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has become a well-oiled collaboration machine.</p>
            <section className="bottomclient">
              <img src={profile3} alt="profile" />
              <section>
                <h1>Iva Boyd</h1>
                <p>Founder & CEO, Huddle</p>
              </section>
            </section>
          </section>
        </section>
        <section className="footer">
          <section>
            <img src={logo} alt="Logo" className="footericon" />
            <section className="footerbottom">
              <section className="location">
                <img src={location} alt="Location Icon" className="locationicon" />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua
                </p>
              </section>
              <section className="infohub">
                <section className="info">
                  <img src={phone} alt="Phone Icon" className="infoicon" />
                  <p>+1-543-123-4567</p>
                </section>
                <section className="info secondinfo">
                  <img src={email} alt="Email Icon" className="infoicon" />
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
                <img alt="Facebook" src={fb} className="icons" />
                <img alt="Twitter" src={twitter} className="icons" />
                <img alt="Instagram" src={insta} className="icons" />
              </section>
            </section>
          </section>
        </section>
      </main>
    </>
  )
}

export default Home