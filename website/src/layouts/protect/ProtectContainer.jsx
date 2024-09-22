import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectContainer = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = Cookies.get("refreshToken");

        if (!refreshToken) {
            navigate('/');
        } else {
            setLoading(false);
        }
    }, [navigate]);

    if (loading) {
        return <div></div>;
    }

    return (
        <>{ children }</>
    );
};

export default ProtectContainer;