import { axiosInstanceCUD, axiosInstanceGET } from './axiosInstance';

export const authApi = {
    getProfileInfo: async () => {
        const res = await axiosInstanceGET.get(`/auth/get-user-by-token`);
        return res.data;
    },
    login: async (data) => {
        console.log(data);
        const res = await axiosInstanceCUD.post(`/auth/login`, data);
        console.log(res.data.data);
        return res.data.data;
    },
    refreshToken: async (refreshToken) => {
        const res = await axiosInstanceCUD.post(`/auth/refresh-token?refreshToken=${refreshToken}`);
        console.log(res.data);
        return res.data;
    },
    changePassword: async ({ password, newPassword }) => {
        const res = await axiosInstanceCUD.put('/auth/change-password', {
            password,
            newPassword
        });
        console.log(res.data);
        return res.data;
    },
    registerSendOtp: async (data) => {
        const res = await axiosInstanceCUD.post('/auth/register', data);
        return res.data;
    },
    otpUserVerification: async (data) => {
        const res = await axiosInstanceCUD.post('/patients/add', data);
        return res.data;
    },
    sendOtpForgotPassword: async (phone) => {
        const res = await axiosInstanceCUD.post(`${'/auth/forgot-password/send-otp'}/${phone}`);
        console.log(res.data);
        return res.data;
    },
    checkOtpForgotPassword: async (data) => {
        const res = await axiosInstanceCUD.post('/auth/forgot-password/check-otp', data);
        return res.data.data;
    },
    changePasswordForgot: async (data) => {
        const res = await axiosInstanceCUD.put('/auth/forgot-password/reset-password', data);
        console.log(res.data);
        return res.data;
    }
};
