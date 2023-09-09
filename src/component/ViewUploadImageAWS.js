import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import './Home.css';
import './FileUploadForm.css'
import './ViewUploadImageAWS.css'
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
function ViewUploadImageAWS() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Define your backend URL where you fetch the list of images
        const backendUrl = 'https://tame-yak-waistcoat.cyclic.cloud/images';

        // Fetch the list of uploaded images from your backend using the fetch API
        fetch(backendUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Assuming your backend returns an array of image objects with 'url' properties
                setImages(data);
            })
            .catch((error) => {
                console.error('Error fetching images:', error);
            });
    }, []);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const logout = async () => {
        await signOut(auth);
        navigate("/");
    }
    const [selectedFile, setSelectedFile] = useState(null);

    // Create a ref for the file input element
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        try {
            if (!selectedFile) {
                console.error('Please select a file.');
                toast.error('Please select a file.');
                return;
            }

            const formData = new FormData();
            formData.append('photos', selectedFile);

            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Handle success or display a success message here
                console.log('File uploaded successfully');
                toast.success('File uploaded successfully');

                // Clear the file input by resetting its value
                fileInputRef.current.value = '';
            } else {
                // Handle errors or display an error message here
                console.error('File upload failed', response.statusText);
                toast.error('File upload failed');
            }
        } catch (error) {
            // Handle network errors or other exceptions here
            console.error('File upload failed', error);
            toast.error('File upload failed');
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
                <h1 className='imagegallery'>Image Gallery</h1>
                <div className="image-list">
                    {images.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image.url} alt={`Image ${index}`} />
                        </div>
                    ))}
                </div>
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
}

export default ViewUploadImageAWS;
