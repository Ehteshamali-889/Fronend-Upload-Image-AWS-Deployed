import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



import toast, { Toaster } from 'react-hot-toast';
import './Home.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';


import location from '../images/icon-location.svg';
import phone from '../images/icon-phone.svg';
import email from '../images/icon-email.svg';


import fb from '../images/facebook.png';
import twitter from '../images/twitter.png';
import insta from '../images/instagram.png';




import { auth, provider, db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { collection, addDoc, getDocs, where, query, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

const EditUser = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const logout = async () => {
        await signOut(auth);
        navigate("/");
    }
  const { userId } = useParams();
  const userDocRef = doc(db, 'users', userId); // Replace 'db' with your Firestore instance
  const [age, setAge] = useState("");
  const [username, setUserName] = useState("");
  const [country, setCountry] = useState("");
  useEffect(() => {
    // Fetch user data and populate the form fields when the component mounts
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setAge(userData.age || ""); // Set age from user data or an empty string if not available
          setUserName(userData.username || ""); // Set username from user data or an empty string if not available
          setCountry(userData.country || ""); // Set country from user data or an empty string if not available
        } else {
          console.log("User document does not exist!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const addUserInfo = async (e) => {
    e.preventDefault();
    // Update user data in Firestore with the new values
    try {
      await setDoc(userDocRef, {
        age,
        username,
        country,
      }, { merge: true }); // Use merge option to update only the provided fields
      toast.success("User information updated successfully");
      setTimeout(() => {
        navigate("/account");
    }, 1000);
    } catch (error) {
      console.error("Error updating user information:", error);
      toast.error("An error occurred while updating user information");
    }
  };

 

  return (
    <main>
                <Toaster />
                <section className="header">
                    <img src={logo} alt="Logo" />
                    <ul className="nav">
                        {user ? (
                            <>
                                <li>{user.displayName}</li>
                                <li className='signin' onClick={logout}>Logout</li>
                            </>
                        ) : ("")}
                    </ul>
                </section>
                <section className="form-container">
                    <h1 className="form-heading">Edit Account</h1>
                            <form className="myForm">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="input-field"
                                        placeholder="Enter Username"
                                        value={username}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        className="input-field"
                                        placeholder="Enter Country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="age"
                                        name="age"
                                        className="input-field"
                                        placeholder="Enter Age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="submit-button" onClick={addUserInfo}>
                                    Submit
                                </button>
                            </form>
                       
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
    
  );
};

export default EditUser;
