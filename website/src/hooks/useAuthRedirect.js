import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAuthRedirect = (roleNames) => {
    const navigate = useNavigate();
    const profile = useSelector((state) => state.auth.userProfile);

    useEffect(() => {
        if (!profile) return;

        if (!roleNames.includes(profile?.role?.name)) {
            if (profile?.role?.name === 'DOCTOR') {
                navigate('/admin/doctor-dashboard');
            }

            if (profile?.role?.name === 'STAFF_RECEPTIONIST') {
                navigate('/admin/appointments/list');
            }

            if (profile?.role?.name === 'STAFF_ACCOUNTANT') {
                navigate('/admin/accountant-dashboard');
            }
        }
    }, [profile, roleNames]);
};