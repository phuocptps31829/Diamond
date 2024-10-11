// const API_URL = "http://localhost:3500/api/v1";
const API_URL = "https://nodejs.diamond.id.vn/api/v1";
// const API_URL = "https://nodejs.diamond.id.vn/api/v1";
const API_CURD_URL = "https://laravel.diamond.id.vn/api/v1";
//https://v41fslrd-8000.asse.devtunnels.ms/api/v1

//service
const API_TAKE_IT_ALL_SERVICES = `${API_URL}/services?limit=9999`;
const API_URL_GET_ALL_SERVICES = `${API_URL}/services`;
const API_URL_GET_SERVICE_BY_ID = `${API_URL}/services`;
const API_URL_GET_SERVICE_BY_SPECIALTIES = `${API_URL}/services/specialty`;
const API_URL_CREATE_SERVICE = `${API_URL}/services/add`;
const API_URL_UPDATE_SERVICE = `${API_URL}/services/update`;
const API_URL_DELETE_SERVICE = `${API_URL}/services/deletee`;
// medical-packages
const API_TAKE_IT_ALL_PACKAGES = `${API_URL}/medical-packages?limit=9999`;
const API_URL_GET_ALL_MEDICAL_PACKAGES = `${API_URL}/medical-packages`;
const API_URL_GET_MEDICAL_PACKAGE_BY_ID = `${API_URL}/medical-packages`;
const API_URL_GET_MEDICAL_PACKAGE_BY_SPECIALTIES = `${API_URL}/medical-packages/specialty`;

// specialties
const API_URL_GET_ALL_SPECIALTIES = `${API_URL}/specialties`;
const API_TAKE_IT_ALL_SPECIALTIES = `${API_URL}/specialties?limit=9999`;
const API_URL_GET_SPECIALTY_WITH_SERVICES = `${API_URL}/specialties/specialties-with-services`;

// doctors
const API_URL_GET_ALL_DOCTORS = `${API_URL}/users`;
const API_URL_GET_ALL_DOCTORS_BY_BRANCHES = `${API_URL}/doctors/branch`;
// clinics
const API_URL_GET_ALL_CLINICS = `${API_URL}/clinics`;

// branches
const API_URL_GET_ALL_BRANCHES = `${API_URL}/branches`;
const API_URL_GET_ALL_BRANCHES_BY_SPECIALTY = `${API_URL}/branches/specialty`;
const API_URL_ADD_BRANCH = `${API_URL}/branches/add`;
const API_URL_UPDATE_BRANCH = `${API_URL}/branches/update`;
const API_URL_DELETE_BRANCH = `${API_URL}/branches/deletee`; // wrong url

// work-schedule
const API_URL_GET_WORK_SCHEDULES_BY_DOCTOR = `${API_URL}/work-schedules/doctor`;

// news
const API_TAKE_IT_ALL_NEWS = `${API_URL}/news?limit=9999`;
const API_URL_GET_ALL_NEWS = `${API_URL}/news`;
const API_URL_CREATE_NEWS = `${API_CURD_URL}/news/add`;
const API_URL_UPDATE_NEWS = `${API_CURD_URL}/news/update`;
const API_URL_DELETE_NEWS = `${API_CURD_URL}/news/delete`; // wrong url
// patients
const API_URL_GET_PATIENTS_BY_ID = `${API_URL}/patients`;

//contact
const API_URL_POST_CONTACT = `${API_URL}/contact/contact-us`;

// auth
const API_LOGIN_GOOGLE = `http://localhost:3500/api/v1/auth/google`;
const API_GET_PROFILE_PATIENTS = `${API_URL}/patients/profile`;

const API_VERIFY_OTP = `${API_URL}/patients/add`;
const API_REGISTER_SEND_OTP = `${API_URL}/auth/register`;
const API_LOGIN = `${API_URL}/auth/login`;
const API_SEND_OTP_FORGOT_PASSWORD = `${API_URL}/auth/forgot-password/send-otp`;
const API_CHECK_OTP_FORGOT_PASSWORD = `${API_URL}/auth/forgot-password/check-otp`;
const API_CHANGE_PASSWORD = `${API_URL}/auth/forgot-password/reset-password`;
const API_LOGOUT = `${API_URL}/auth/logout`;
const API_REFRESH_TOKEN = `${API_URL}/auth/refresh-token`;

// Provinces
const API_PROVINCES = `${API_URL}/provinces`;
const API_DISTRICTS = `${API_URL}/provinces/districts`;
const API_WARDS = `${API_URL}/provinces/wards`;

// Appointments
const API_CREATE_APPOINTMENT_VNPAY = `${API_URL}/invoices/payment/vnpay`;
const API_CREATE_APPOINTMENT_MOMO = `${API_URL}/invoices/payment/momo`;

// patients
const API_GET_ALL_PATIENTS = `${API_URL}/patients`;

// appointments
const API_GET_UPCOMING_APPOINTMENTS = `${API_URL}/appointments?limit=9999&sort=-time`;
const API_GET_ALL_APPOINTMENTS = `${API_URL}/appointments?limit=9999`;
const API_GET_PATIENTS_BY_GENDER = `${API_URL}/appointments/gender-years`;
const API_GET_TOTAL_PATIENTS_BY_SPECIALTY = `${API_URL}/appointments/specialty`;

// invoices
const API_GET_ALL_INVOICES = `${API_URL}/invoices?limit=9999`;

// Appointments
const API_URL_GET_ALL_APPOINTMENTS = `${API_URL}/appointments?limit=9999`;
const API_URL_GET_APPOINTMENTS_BY_ID = `${API_URL}/appointments`;

// Medicines
const API_URL_GET_ALL_MEDICINES = `${API_URL}/medicines?litmit=9999`;

// MedicinesCategories
const API_URL_GET_ALL_MEDICINES_CATEGORIES = `${API_URL}/medicine-categories`;

export {
  API_URL_GET_ALL_MEDICINES_CATEGORIES,
  API_URL_GET_ALL_MEDICINES,
  API_TAKE_IT_ALL_PACKAGES,
  API_GET_UPCOMING_APPOINTMENTS,
  API_GET_PATIENTS_BY_GENDER,
  API_GET_TOTAL_PATIENTS_BY_SPECIALTY,
  API_TAKE_IT_ALL_NEWS,
  API_GET_ALL_INVOICES,
  API_GET_ALL_APPOINTMENTS,
  API_GET_ALL_PATIENTS,
  API_TAKE_IT_ALL_SERVICES,
  API_URL_GET_ALL_SERVICES,
  API_URL_GET_ALL_MEDICAL_PACKAGES,
  API_URL_GET_ALL_SPECIALTIES,
  API_URL_GET_ALL_DOCTORS,
  API_URL_GET_ALL_CLINICS,
  API_TAKE_IT_ALL_SPECIALTIES,
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
  API_REFRESH_TOKEN,
  API_SEND_OTP_FORGOT_PASSWORD,
  API_CHECK_OTP_FORGOT_PASSWORD,
  API_CHANGE_PASSWORD,
  API_LOGOUT,
  API_PROVINCES,
  API_DISTRICTS,
  API_WARDS,
  API_URL_GET_ALL_DOCTORS_BY_BRANCHES,
  API_URL_GET_ALL_BRANCHES_BY_SPECIALTY,
  API_URL_GET_WORK_SCHEDULES_BY_DOCTOR,
  API_CREATE_APPOINTMENT_VNPAY,
  API_CREATE_APPOINTMENT_MOMO,
  API_URL_CREATE_NEWS,
  API_URL_UPDATE_NEWS,
  API_URL_ADD_BRANCH,
  API_URL_UPDATE_BRANCH,
  API_URL_DELETE_BRANCH,
  API_URL_DELETE_NEWS,
  API_URL_GET_ALL_APPOINTMENTS,
  API_URL_GET_PATIENTS_BY_ID,
  API_URL_GET_APPOINTMENTS_BY_ID,
  API_URL_CREATE_SERVICE,
  API_URL_UPDATE_SERVICE,
  API_URL_DELETE_SERVICE,
};
