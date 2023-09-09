import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import './Home.css';
import { Link } from 'react-router-dom';
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

import { auth, provider, db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { collection, addDoc, getDocs, where, query, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";


function Main() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const logout = async () => {
        await signOut(auth);
        navigate("/");
    }

    const [age, setAge] = useState("");
    const [username, setUserName] = useState("");
    const [country, setCountry] = useState("");
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        // Set isLoading to true when fetching data starts
        setIsLoading(true);

        fetchUserData()
            .then(() => {
                // Set isLoading to false when data fetching is complete
                setIsLoading(false);
            });
    }, [user]);

    const fetchUserData = async () => {
        if (user) {
            const userUid = user.uid;
            const collectionRef = collection(db, "users");
            const q = query(collectionRef, where("uid", "==", userUid));

            try {
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    // No user-specific data found, so clear the userData state
                    setUserData([]);
                } else {
                    // User-specific data found, fetch and set it
                    const userData = querySnapshot.docs.map((doc) => {
                        const data = doc.data();
                        return { ...data, id: doc.id };
                    });
                    setUserData(userData);
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
    };

    const addUserInfo = async (e) => {
        e.preventDefault();

        try {
            const user = auth.currentUser;
            if (!user) {
                console.error("User is not authenticated");
                return;
            }

            const userData = {
                age: age,
                username: username,
                country: country,
                uid: user.uid,
            };

            const userDocRef = doc(db, "users", user.uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                await setDoc(userDocRef, userData, { merge: true });
                console.log("Document updated with ID: ", user.uid);
            } else {
                await setDoc(userDocRef, userData);
                console.log("Document created with ID: ", user.uid);
            }
            toast.success('Successfully Added User Info!')
            fetchUserData();
        } catch (e) {
            console.error("Error adding/updating document: ", e);
        }
    };

    const deleteUser = async (userId) => {
        try {
            // Delete user data from Firestore collection
            await deleteDoc(doc(db, "users", userId));

            // Delete the user account from Firebase Authentication
            await auth.currentUser.delete();

            // Log the user out
            await signOut(auth);
            toast.success('User Deleted Successfully!')
            // Navigate to the home page ("/")
            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            console.error("Error deleting user: ", error);
            toast.error('Error deleting user account and data.');
        }
    };


    return (
        <>
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
                    <h1 className="form-heading">Welcome</h1>
                    {isLoading ? ( // Conditional rendering based on isLoading
                        <div className="loader">
                            Loading...
                        </div>
                    ) : (
                        userData.length > 0 ? (
                            userData.map((user) => (
                                <div className="submitted-data" key={user.id}>
                                    <p><strong>Username:</strong>&nbsp; {user.username}</p>
                                    <p><strong>Country:</strong>&nbsp; {user.country}</p>
                                    <p><strong>Age:</strong> &nbsp;{user.age}</p>
                                    <div className='btnhub'>
                                        <Link to={`/editaccount/${user.id}`} className="edit-button">
                                            Edit Account
                                        </Link>
                                        <button
                                            className="delete-button"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Delete Account
                                        </button>
                                    </div>

                                </div>
                            ))
                        ) : (
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
                        )
                    )}
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
    );
}





export default Main