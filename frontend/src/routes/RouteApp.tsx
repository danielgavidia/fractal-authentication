import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


const RouteApp = () => {
    const location = useLocation();
    const token = location.state.idToken;
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const res = await axios({
            method: "POST",
            url: `${import.meta.env.VITE_EXPRESS_BASE_URL}/user`,
            headers: { Authorization: `Bearer ${token}` },
        });
        setEmail(res.data.email);
    };

    return (
        <div id="RouteApp" className="bg-neutral h-screen p-4">
            <div>Your email is: {email}</div>
        </div>
    );
};

export default RouteApp;
