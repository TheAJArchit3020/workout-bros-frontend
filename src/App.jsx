import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import Routing from "./common/routing";

function App() {
  return (
    <>
      <Routing />
    </>
  );
}

export default App;
