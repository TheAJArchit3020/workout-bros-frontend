import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Login from "../pages/login/Login";
import CreateProfile from "../pages/register/CreateProfile";
import Explore from "../pages/explore/Explore";
import Profile from "../pages/profile/Profile";
import Filter from "../pages/filter/Filter";
import Chatting from "../pages/chatting/chatting";
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createProfile" element={<CreateProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/Chatting" element={<Chatting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
