import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Login from "../pages/login/Login";
import CreateProfile from "../pages/register/CreateProfile";
import Explore from "../pages/explore/Explore";
import Profile from "../pages/profile/Profile";
import Filter from "../pages/filter/Filter";
import Connection from "../pages/connection/Connection";
import Chatting from "../pages/chatting/chatting";
import Publicprofile from "../pages/profile/Publicprofile";
import Editprofile from "../pages/profile/Editprofile";


const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> //finish
        <Route path="/createProfile" element={<CreateProfile />} /> //finish-plus icon gap 
        <Route path="/profile" element={<Profile />} />  //PROFILE - icons
        <Route path="/explore" element={<Explore />} />
        <Route path="/publicprofile" element={<Publicprofile />} />
        <Route path="/editprofile" element={<Editprofile />} />  //finish
        <Route path="/filter" element={<Filter />} />  //finish
        <Route path="/connection" element={<Connection />} /> //
        <Route path="/Chatting" element={<Chatting />} /> //finish
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
