import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Login from "../pages/login/Login";
import Explore from "../pages/explore/Explore";
import Profile from "../pages/profile/Profile";
import Filter from "../pages/filter/Filter";
import Connection from "../pages/connection/Connection";
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/connection" element={<Connection />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
