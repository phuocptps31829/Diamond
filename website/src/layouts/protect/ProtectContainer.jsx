import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ProtectContainer = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const queryAccessToken = searchParams.get("accessToken");
    const queryRefreshToken = searchParams.get("refreshToken");

    useEffect(() => {
        const refreshToken = Cookies.get("refreshToken");

        if (!refreshToken && !queryRefreshToken) {
            navigate('/');
        } else {
            if (queryAccessToken && queryRefreshToken) {
                Cookies.set("accessToken", queryAccessToken, {
                    expires: new Date(Date.now() + 60 * 1000)
                });
                Cookies.set("refreshToken", queryRefreshToken, {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                });
                navigate('/user-profile');
            }
            setLoading(false);
        }
    }, [navigate, searchParams, queryAccessToken, queryRefreshToken]);

    if (loading) {
        return <div></div>;
    }

    return (
        <>{ children }</>
    );
};

export default ProtectContainer;