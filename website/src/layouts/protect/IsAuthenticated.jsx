import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const IsAuthenticated = ({ children }) => {
    const userProfile = useSelector((state) => state.auth.userProfile);
    const navigate = useNavigate();

    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    useEffect(() => {
        if (userProfile || accessToken || refreshToken) {
            navigate('/profile');
        }
    }, [userProfile, navigate, accessToken, refreshToken]);

    return (
        <>
            { children }
        </>
    );
};

export default IsAuthenticated;