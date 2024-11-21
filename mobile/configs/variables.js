const API_URL = "http://160.30.44.27:3000/api/v1";
const URL_IMAGE = "http://160.30.44.27:8000/images/";

//service
const API_URL_GET_ALL_SERVICES = `${API_URL}/services`;
const API_URL_GET_SERVICE_BY_ID = `${API_URL}/services`;
const API_URL_GET_SERVICE_BY_SPECIALTIES = `${API_URL}/services/specialty`;

// medical-packages
const API_URL_GET_ALL_MEDICAL_PACKAGES = `${API_URL}/medical-packages`;
const API_URL_GET_MEDICAL_PACKAGE_BY_ID = `${API_URL}/medical-packages`;
const API_URL_GET_MEDICAL_PACKAGE_BY_SPECIALTIES = `${API_URL}/medical-packages/specialty`;

// specialties
const API_URL_GET_ALL_SPECIALTIES = `${API_URL}/specialties`;
const API_URL_GET_SPECIALTY_BY_ID = `${API_URL}/specialties`;
const API_URL_GET_SPECIALTY_WITH_SERVICES = `${API_URL}/specialties/specialties-with-services`;

// doctors
const API_URL_GET_ALL_DOCTORS = `${API_URL}/doctors`;
// branches
const API_URL_GET_ALL_BRANCHES = `${API_URL}/branches`;

// news
const API_URL_GET_ALL_NEWS = `${API_URL}/news`;

//contact
const API_URL_POST_CONTACT = `${API_URL}/contact/contact-us`;

// auth
const API_LOGIN_GOOGLE = `http://api.cosstewn.io.vn/api/v1/auth/google`;
const API_GET_PROFILE_PATIENTS = `${API_URL}/patients/profile`;

const API_VERIFY_OTP = `${API_URL}/patients/add`;
const API_REGISTER_SEND_OTP = `${API_URL}/auth/register`;
const API_LOGIN = `${API_URL}/auth/login`;
const API_SEND_OTP_FORGOT_PASSWORD = `${API_URL}/auth/forgot-password/send-otp`;
const API_CHECK_OTP_FORGOT_PASSWORD = `${API_URL}/auth/forgot-password/check-otp`;
const API_CHANGE_PASSWORD = `${API_URL}/auth/forgot-password/reset-password`;
const API_LOGOUT = `${API_URL}/auth/logout`;

// Provinces
const API_PROVINCES = `${API_URL}/provinces`;
const API_DISTRICTS = `${API_URL}/provinces/districts`;
const API_WARDS = `${API_URL}/provinces/wards`;

export {
  URL_IMAGE,
  API_URL_GET_ALL_SERVICES,
  API_URL_GET_ALL_MEDICAL_PACKAGES,
  API_URL_GET_ALL_SPECIALTIES,
  API_URL_GET_ALL_DOCTORS,
  API_URL_GET_SPECIALTY_BY_ID,
  API_URL_GET_SERVICE_BY_ID,
  API_URL_GET_MEDICAL_PACKAGE_BY_ID,
  API_URL_GET_MEDICAL_PACKAGE_BY_SPECIALTIES,
  API_URL_GET_SERVICE_BY_SPECIALTIES,
  API_URL_GET_ALL_NEWS,
  API_URL_GET_SPECIALTY_WITH_SERVICES,
  API_URL_POST_CONTACT,
  API_URL_GET_ALL_BRANCHES,
  API_LOGIN_GOOGLE,
  API_GET_PROFILE_PATIENTS,
  API_VERIFY_OTP,
  API_REGISTER_SEND_OTP,
  API_LOGIN,
  API_SEND_OTP_FORGOT_PASSWORD,
  API_CHECK_OTP_FORGOT_PASSWORD,
  API_CHANGE_PASSWORD,
  API_LOGOUT,
  API_PROVINCES,
  API_DISTRICTS,
  API_WARDS,
};
