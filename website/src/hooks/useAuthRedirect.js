import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAuthRedirect = (roleNames, endpoint) => {
    const navigate = useNavigate();
    const profile = useSelector((state) => state.auth.userProfile);

    useEffect(() => {
        if (!profile) return;

        if (!roleNames.includes(profile?.role?.name)) {
            navigate(endpoint);
        }
    }, [profile, endpoint, roleNames]);
};