import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Login from "../pages/login/Login";
import Explore from "../pages/explore/Explore";
import Profile from "../pages/profile/Profile";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
