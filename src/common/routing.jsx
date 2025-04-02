import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Login from "../pages/login/Login";
import CreateProfile from "../pages/register/CreateProfile";
import Explore from "../pages/explore/Explore";
import Profile from "../pages/profile/Profile";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CreateProfile" element={<CreateProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
