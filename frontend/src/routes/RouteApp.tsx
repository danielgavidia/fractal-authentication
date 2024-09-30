import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const RouteApp = () => {
    const location = useLocation();
    const token = location.state.token;
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const res = await axios({
            method: "GET",
            url: `${BASE_URL}/user/`,
            headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(res.data.username);
        setEmail(res.data.email);
        setAddress(res.data.address);
    };

    return (
        <div id="RouteApp" className="bg-neutral h-screen p-4">
            <div>Your username is: {username}</div>
            <div>Your email is: {email}</div>
            <div>Your address is: {address}</div>
        </div>
    );
};

export default RouteApp;
