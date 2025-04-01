import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "../pages/HomePage/Homepage";
import FormPage from "../pages/Form/FormPage";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
