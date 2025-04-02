import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Login from "../pages/login/Login";
import Profile from "../pages/register/CreateProfile";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
