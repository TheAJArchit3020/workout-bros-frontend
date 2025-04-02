import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response.access_token);
      setAccessToken(response.access_token);
    },
  });

  useEffect(() => {
    if (accessToken) {
      getUserDetails();
    }
  }, [accessToken]);

  const getUserDetails = async () => {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("google Response", response);
    navigate("/Profile");
  };

  return (
    <div className="login-container">
      <div className="overlay"/>
      <div className="content-container">
        <h1>
          Meet people nearby who share your interests! Connect, chat, and do
          activities together. Join now.!
        </h1>
        <button onClick={handleGoogleSignIn} className="btn">
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
