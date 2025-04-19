import React, { useEffect, useState } from "react";
import "./Payment.css";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router";
import { use } from "react";
import axios from "axios";
import {
  getPaymentPlans,
  verifyPaymentapi,
  sendconnectrequestapi,
  getCurrentPlanapi,
} from "../../common/apis";

const Payment = () => {
  const navigate = useNavigate();
  const [plansArray, setPlansArray] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [currentPlan, setCurrentPlan] = useState({});
  const [tocken,setTocken] = useState("");
  const [isPlanPurchased,setIsPlanPurchased] = useState(false);
  const handleBackButton = () => {
    navigate("/explore");
  };

  const getPlans = async (token) => {
    console.log("Token", token);
    try {
      const getPlansResponse = await axios.get(getPaymentPlans,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setSelectedPlan(
        ...getPlansResponse.data.plans.filter(
          (plan) => plan.name === "Yearly Plan"
        )
      );
      return getPlansResponse.data;
    } catch (error) {
      console.log("getPlans", error);
      return {
        plans: [],
      };
    }
  };

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    console.log("razorPay Loaded");
  };

  const getCurrentPlan = async (token) => {

    try {
      const isPlanPurchase = await axios.get(getCurrentPlanapi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("isPlanPurchased", isPlanPurchase);
      setIsPlanPurchased(isPlanPurchase.data.isPurchased);
      if(!isPlanPurchase.data.isPurchased){
        setCurrentPlan({name:"Free Plan"});
        return false;
      }
      else{
        const currentPlan = {
          name: isPlanPurchase.data.plan.name,
          price: isPlanPurchase.data.plan.price,
          id: isPlanPurchase.data.plan.id,
          endDate : isPlanPurchase.data.subscription.endDate.split("T")[0],
          description:isPlanPurchase.data.plan.description,
        }
        setCurrentPlan(currentPlan);
        return true;
      }
    } catch (error) {
      console.log("isPlanPurchased", error);
    }
  };

  const fetchCurrentPlan = async (token) => {
    const isUserPurchasedPlan = await getCurrentPlan(token);

    if (!isUserPurchasedPlan) {
      loadRazorpay();
      const data = await getPlans(token);
      setPlansArray(data.plans);
      console.log("getResponseData", data);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenData = JSON.parse(token || "null");
    setTocken(tokenData);

    fetchCurrentPlan(tokenData);
    return () => {
      const script = document.querySelector(
        "script[src='https://checkout.razorpay.com/v1/checkout.js']"
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const getRazorPayObject = async () => {
    try {
      const response = await axios.post(
        sendconnectrequestapi,
        {
          planId: selectedPlan._id,
        },
        {
          headers: {
            Authorization: `Bearer ${tocken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Payment Error", error);
    }
  };

  const handleResponse = async (response) => {
    console.log("payment response", {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
      planId: selectedPlan._id,
    });

    try {
      const verifyPayment = await axios.post(
        verifyPaymentapi,
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          planId: selectedPlan._id,
        },
        {
          headers: {
            Authorization: `Bearer ${tocken}`,
          },
        }
      );
      console.log("verify Payment", verifyPayment);
      if (verifyPayment.status === 200) {
        setIsPlanPurchased(true);
        const currentPlan = {
          name: selectedPlan.name,
          price: selectedPlan.price,
          id: selectedPlan._id,
          endDate : verifyPayment.data.subscription.endDate.split("T")[0],
          description:selectedPlan.description
        }
        setCurrentPlan(currentPlan);
      }
    } catch (error) {
      console.log("verify Payment Error", error);
    }
  };
  const handlePaymentButton = async () => {
    if (selectedPlan === "") {
      return;
    }
    const paymentResponse = await getRazorPayObject();
    var options = {
      key: paymentResponse.razorpayOrder.key,
      amount: paymentResponse.razorpayOrder.amount,
      currency: "INR",
      name: "Kineticscape Studios",
      description: "Test Transaction",
      image: "images/logo/logo.svg",
      order_id: paymentResponse.razorpayOrder.id,
      handler: async function (response) {
        await handleResponse(response);
      },
      // "prefill": {
      //     "name": selectedPlan.userName,
      //     "email": selectedPlan.userEmail,
      //     "contact": selectedPlan.userContact
      // },
      notes: {
        address: "archit@kineticscapestudios.com",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razorpayCheckOut = new window.Razorpay(options);
    razorpayCheckOut.open();
    console.log("razorpayCheckOut", razorpayCheckOut);
  };

  return (
    <div className="payment-container">
      <div className="p-c-header">
        <div className="p-c-header-backButton" onClick={handleBackButton}>
          <ArrowLeftIcon className="backButton" />
        </div>
      </div>

      <div className="p-c-body">
        {!isPlanPurchased ? (
          <span className="p-c-body-title">
            choose your <span className="p-c-body-title-highlight">plan</span>
          </span>
        ) : (
          <span className="p-c-body-title">
            Your current <span className="p-c-body-title-highlight">plan</span>
          </span>
        )}

        {!isPlanPurchased ? (
          <>
            <div className="p-c-body-plans-container">
              {plansArray.map((item, index) => {
                return (
                  <div
                    className={`p-c-body-plan-button ${
                      selectedPlan.name === item.name
                        ? "p-c-body-plan-button-selected"
                        : currentPlan.name === item.name
                        ? "p-c-body-plan-button-current"
                        : " "
                    }`}
                    key={index}
                    onClick={() => {
                      if (currentPlan.name === item.name) {
                        return;
                      }
                      setSelectedPlan(item);
                    }}
                  >
                    <div className="p-c-body-plan-button-text-container">
                      <span
                        className={`p-c-body-plan-button-text ${
                          currentPlan.name === item.name &&
                          "p-c-body-plan-button-current-text"
                        }`}
                        style={{ fontWeight: "bold" }}
                      >
                        {currentPlan.name === item.name
                          ? "Current Plan"
                          : item.name}
                      </span>
                      <span
                        className={`p-c-body-plan-button-text ${
                          currentPlan.name === item.name &&
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
                          currentPlan.name === item.name &&
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
              <div
                className="p-c-body-subscription-button"
                onClick={handlePaymentButton}
              >
                <span>Subscribe</span>
              </div>
              {/* <div className="p-c-body-subscription-policies">
                <span className="p-c-body-subscription-policy">
                  Terms and conditions
                </span>
                <span>/</span>
                <span className="p-c-body-subscription-policy">
                  Privacy policy{" "}
                </span>
              </div> */}
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
                  {currentPlan.name}
                </span>
                <span
                  className={
                    "p-c-body-plan-button-text p-c-body-plan-button-current-text"
                  }
                  style={{ fontStyle: "italic" }}
                >
                  {currentPlan.description}
                </span>
              </div>
              <div className="p-c-body-plan-button-price-container">
                <span
                  className={
                    "p-c-body-plan-button-text p-c-body-plan-button-current-text"
                  }
                  style={{ fontWeight: "bold" }}
                >
                  Rs.{currentPlan.price}
                </span>
              </div>
            </div>
            <span className="p-c-body-plan-exipiryText">
              Your current plan expires on {currentPlan?.endDate}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
