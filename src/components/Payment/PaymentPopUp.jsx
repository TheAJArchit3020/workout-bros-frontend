import React from "react";
import "./PaymentPopUp.css";
import { useNavigate } from "react-router";
const PaymentPopUp = () => {
  const navigate = useNavigate();
  const handleUpgradeButton = (e) => {
     e.stopPropagation(); 
     navigate("/payment");
  };

  return (
    <div className="payment-popup-info-container">
      <img
        src="./images/payment/warning.png"
        alt="close-icon"
        className="payment-popup-info-container-img"
      />
      <span className="payment-popup-info-container-text">
        You’ve used all 5 free connection requests! for the day. Upgrade your
        plan to connect with more people
      </span>
      <div
        className="payment-popup-info-container-button"
        onClick={handleUpgradeButton}
      >
      <span className="payment-popup-info-container-button-text">
        Upgrade your plan
      </span>
      </div>
    </div>
  );
};

export default PaymentPopUp;
