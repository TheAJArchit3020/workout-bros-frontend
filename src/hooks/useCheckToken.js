import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getuserprofileapi } from "../common/apis";

const useCheckToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const tokenData = JSON.parse(token || "null");

      if (!tokenData) {
        console.log("No token found. Redirecting...");
        navigate("/"); // Redirect if token is missing
        return;
      }

      try {
        const response = await axios.get(getuserprofileapi, {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        });
        console.log("Token is valid, user:", response.data.user);
        if (!response.data.user.isProfileUpdated) {
          navigate("/createProfile");
        }
        // You can store users in state if needed
      } catch (error) {
        console.error("Token check failed:");
        console.log("Removing the tokeeeen from local storage!!!");
        localStorage.removeItem("token");
        navigate("/"); // Redirect if token is invalid
      }
    };

    checkToken();
  }, [navigate]); // Add navigate to dependency array
};

export default useCheckToken;
