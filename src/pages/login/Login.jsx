import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import { getuserprofileapi, loginapi } from "../../common/apis";
import Loader from "../../components/loader/Loader";
import ReactGA from "react-ga4";

const Login = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [isuserLoggedIn, setIsUserLoggedIn] = useState(true);
  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response.access_token);
      setAccessToken(response.access_token);
    },
  });
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  useEffect(() => {
    if (accessToken) {
      getUserDetails();
    }
  }, [accessToken]);

  const getUserDetails = async () => {
    console.log("accessToken", accessToken);
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("google Response", response);
    const loginResponse = await axios.post(loginapi, {
      email: response.data.email,
      googleId: response.data.sub,
    });
    const { data, status } = loginResponse;
    console.log("login Response", data?.user?.isProfileUpdated);
    if (status === 200) {
      localStorage.setItem("token", JSON.stringify(data.token));
      if (data?.user?.isProfileUpdated) {
        navigate("/explore");
      } else {
        navigate("/createProfile");
      }
    }
  };

  useEffect(() => {
    const loginCheck = async () => {
      try {
        const response = await axios.get(getuserprofileapi, {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        });
        if (response.data.user.isProfileUpdated) {
          navigate("/explore");
        } else {
          navigate("/createProfile");
        }
      } catch (error) {
        setIsUserLoggedIn(false);
      }
    };
    const token = localStorage.getItem("token");
    const tokenData = JSON.parse(token || "null");
    console.log(token);
    if (tokenData) {
      loginCheck();
    } else {
      setIsUserLoggedIn(false);
    }
    
  }, []);
  return (
    <>
      {isuserLoggedIn && <Loader />}
      <div className="login-container">
        <div className="overlay" />
        <div className="content-container">
          <div className="logo-container"></div>
          <h1>
            Meet people nearby who share your interests! Connect, chat, and do
            activities together. Join now.!
          </h1>
          <button onClick={handleGoogleSignIn} className="btn">
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
