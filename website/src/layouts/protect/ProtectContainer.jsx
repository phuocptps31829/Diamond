import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ProtectContainer = ({ children, type }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const queryRefreshToken = searchParams.get("refreshToken");

    useEffect(() => {
        const refreshToken = Cookies.get("refreshToken");

        if (!refreshToken && !queryRefreshToken) {
            type === "admin" ? navigate('/admin/auth') : navigate('/');
        }
        setLoading(false);
    }, [navigate, queryRefreshToken, type]);

    if (loading) {
        return <div></div>;
    }

    return (
        <>{ children }</>
    );
};

export default ProtectContainer;