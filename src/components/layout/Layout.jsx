import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import "./Layout.css";

const Layout = ({ children }) => {


  
  return (
    <div className="layout-container">
      {/* <Navbar /> */}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
