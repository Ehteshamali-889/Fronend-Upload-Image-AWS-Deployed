import React from 'react'

import './App.css';

import Home from './component/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './component/Main';
import EditUser from './component/EditUser';
import FileUploadFormAWS from './component/FileUploadFormAWS';
import ViewUploadImageAWS from './component/ViewUploadImageAWS';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/account" element={<Main />}></Route>
        <Route path="/editaccount/:userId" element={<EditUser />}></Route>
        <Route path="/uploadimageaws" element={<FileUploadFormAWS />}></Route>
        <Route path="/viewimageaws" element={<ViewUploadImageAWS />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App