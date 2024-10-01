import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

// const { getToken } = useAuth();

const BASE_URL = "http://localhost:3000";

const RouteHome = () => {
    const [token, setToken] = useState<string | null>(null);
    const { getToken } = useAuth();

    useEffect(() => {
        getUserId();
    }, []);

    const getUserId = async () => {
        const token = await getToken();
        console.log(token);
        setToken(token);
        const res = await axios({
            method: "GET",
            url: `${BASE_URL}/authenticated/`,
            headers: { Authorization: `Bearer ${token}` },
        });
        setToken(res.data);
        console.log(res.data);
    };

    return (
        <div id="RouteHome" className="bg-neutral h-screen p-4">
            This is an app that will solve all your problems
            <div>{token}</div>
        </div>
    );
};

export default RouteHome;
