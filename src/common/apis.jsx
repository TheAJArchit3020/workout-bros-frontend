const baseurl = "https://api.swolhomies.com/api";

const loginapi = `${baseurl}/auth/google`;

// create profile
const registerprofileapi = `${baseurl}/users/profile`;
const getAllInterestsapi = `${baseurl}/users/all/interest`;

// explore api
const getExplorelocationapi = `${baseurl}/users/location`;
const sendconnectrequestapi = `${baseurl}/chat/request`;
const getnearbyusersapi = `${baseurl}/users/nearby`;

// profile api
const getpublicprofileapi = `${baseurl}/users`;
const getuserprofileapi = `${baseurl}/users/profile`;

// chat api
const getchatpendingapi = `${baseurl}/chat/pending`;
const getchatrequestsapi = `${baseurl}/notifications`;
const acceptchatrequestsapi = `${baseurl}/chat/accept`;
const getchatsapi = `${baseurl}/chat`;

const getPaymentPlans = `${baseurl}/plans/all`;

export {
  loginapi,
  registerprofileapi,
  getAllInterestsapi,
  getExplorelocationapi,
  sendconnectrequestapi,
  getnearbyusersapi,
  getpublicprofileapi,
  getuserprofileapi,
  getchatpendingapi,
  getchatrequestsapi,
  acceptchatrequestsapi,
  getchatsapi,
  getPaymentPlans
};
