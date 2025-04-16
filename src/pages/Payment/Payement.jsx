import React, { useEffect, useState } from "react";
import "./Payment.css";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router";
import { use } from "react";
import axios from "axios";
import { getPaymentPlans } from "../../common/apis";
const Payment = () => {
  const navigate = useNavigate();
  const [plansArray, setPlansArray] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [currentPlan, setCurrentPlan] = useState("Free");
  const handleBackButton = () => {
    navigate(-1);
  };

  const getPlans = async () => {
    const token = localStorage.getItem("token");
    const tokenData = JSON.parse(token || "null");
    const getPlansResponse = await axios.get(getPaymentPlans, {
      headers: {
        Authorization: `Bearer ${tokenData}`,
      },
    });
    return getPlansResponse.data;
  };

  useEffect(() => {
    const getResponseData = async () => {
      const data = await getPlans();
      setPlansArray(data.plans);
      console.log("getResponseData", data);
    };
    getResponseData();
  }, []);

  const handlePaymentButton = () => {};

  return (
    <div className="payment-container">
      <div className="p-c-header">
        <div className="p-c-header-backButton" onClick={handleBackButton}>
          <ArrowLeftIcon className="backButton" />
        </div>
      </div>

      <div className="p-c-body">
        {currentPlan === "Free" ? (
          <span className="p-c-body-title">
            choose your <span className="p-c-body-title-highlight">plan</span>
          </span>
        ) : (
          <span className="p-c-body-title">
            Your current <span className="p-c-body-title-highlight">plan</span>
          </span>
        )}

        {currentPlan === "Free" ? (
          <>
            <div className="p-c-body-plans-container">
              {plansArray.map((item, index) => {
                return (
                  <div
                    className={`p-c-body-plan-button ${
                      selectedPlan === item.name
                        ? "p-c-body-plan-button-selected"
                        : currentPlan === item.name
                        ? "p-c-body-plan-button-current"
                        : " "
                    }`}
                    key={index}
                    onClick={() => {
                      if (currentPlan === item.name) {
                        return;
                      }

                      setSelectedPlan(item.name);
                    }}
                  >
                    <div className="p-c-body-plan-button-text-container">
                      <span
                        className={`p-c-body-plan-button-text ${
                          currentPlan === item.name &&
                          "p-c-body-plan-button-current-text"
                        }`}
                        style={{ fontWeight: "bold" }}
                      >
                        {currentPlan === item.name
                          ? "Current Plan"
                          : item.name}
                      </span>
                      <span
                        className={`p-c-body-plan-button-text ${
                          currentPlan === item.name &&
                          "p-c-body-plan-button-current-text"
                        }`}
                        style={{ fontStyle: "italic" }}
                      >
                        {item.description}
                      </span>
                    </div>
                    <div className="p-c-body-plan-button-price-container">
                      <span
                        className={`p-c-body-plan-button-text ${
                          currentPlan === item.name &&
                          "p-c-body-plan-button-current-text"
                        }`}
                        style={{ fontWeight: "bold" }}
                      >
                        {item.price !== "Free" && "Rs."}
                        {item.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-c-body-subscription-conatiner">
              <div className="p-c-body-subscription-button">
                <span>Subscribe</span>
              </div>
              <div className="p-c-body-subscription-policies">
                <span className="p-c-body-subscription-policy">
                  Terms and conditions
                </span>
                <span>/</span>
                <span className="p-c-body-subscription-policy">
                  Privacy policy{" "}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="p-c-body-currentplan-container">
            <div
              className={"p-c-body-plan-button p-c-body-plan-button-current"}
            >
              <div className="p-c-body-plan-button-text-container">
                <span
                  className={
                    "p-c-body-plan-button-text  p-c-body-plan-button-current-text"
                  }
                  style={{ fontWeight: "bold" }}
                >
                  One year Plan
                </span>
                <span
                  className={
                    "p-c-body-plan-button-text p-c-body-plan-button-current-text"
                  }
                  style={{ fontStyle: "italic" }}
                >
                  description
                </span>
              </div>
              <div className="p-c-body-plan-button-price-container">
                <span
                  className={
                    "p-c-body-plan-button-text p-c-body-plan-button-current-text"
                  }
                  style={{ fontWeight: "bold" }}
                >
                  Rs.500/-
                </span>
              </div>
            </div>
            <span className="p-c-body-plan-exipiryText">
              Your current plan expires on 16/04/25
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
