import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Login = () => {
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
  };

  return (
    <div>
      <h1>Workout Bros</h1>
      <span>Login with Google</span>
      <button onClick={handleGoogleSignIn}>Sign in with google</button>
    </div>
  );
};

export default Login;
