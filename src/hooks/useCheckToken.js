import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getnearbyusersapi, getuserprofileapi } from "../common/apis";

const useCheckToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const tokenData = JSON.parse(token || "null");

      if (!tokenData) {
        navigate("/"); // Redirect if token is missing
        return;
      }

      try {
        const response = await axios.get(getuserprofileapi, {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        });

        const { users } = response.data;
        console.log("Fetched users:", users);
        // You can store users in state if needed
      } catch (error) {
        console.error("Token check failed:", error);
        navigate("/"); // Redirect if token is invalid
      }
    };

    checkToken();
  }, [navigate]); // Add navigate to dependency array
};

export default useCheckToken;
