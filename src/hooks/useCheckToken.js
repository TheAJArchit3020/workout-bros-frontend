import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getnearbyusersapi } from "../common/apis";

const useCheckToken = () => {
  const navigate = useNavigate();

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    const tokenData = JSON.parse(token);

    console.log("hook token :", tokenData);

    if (!tokenData) {
      navigate("/");
    } else {
      try {
        console.log("Calling the get user api");
        const response = await axios.get(getuserprofileapi, {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        });

        const { users } = response.data;
        console.log("Fetched users:", users);
        return users;
      } catch (error) {
        console.log("Inside the error");
        console.error("Invalid token or error fetching users:", error);
        navigate("/"); // Redirect to login if error
      }
    }
  };

  checkToken();
};

export default useCheckToken;
