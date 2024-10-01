import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ProtectContainer = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const queryRefreshToken = searchParams.get("refreshToken");

    useEffect(() => {
        const refreshToken = Cookies.get("refreshToken");

        if (!refreshToken && !queryRefreshToken) {
            navigate('/');
        }
        setLoading(false);
    }, [navigate, queryRefreshToken]);

    if (loading) {
        return <div></div>;
    }

    return (
        <>{ children }</>
    );
};

export default ProtectContainer;