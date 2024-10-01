import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth, onAuthStateChanged, User } from "firebase/auth"


const RouteApp = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("");
    const [user, setUser] = useState<User | null>(null)
    console.log(user)

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                getUserData(user)
            } else {
                navigate("/home/login", { replace: true })
            }
        })
        return () => unsubscribe()
    }, [navigate])

    const getUserData = async (user: User) => {
        const idToken = await user.getIdToken()
        const res = await axios({
            method: "POST",
            url: `${import.meta.env.VITE_EXPRESS_BASE_URL}/user`,
            headers: { Authorization: `Bearer ${idToken}` },
        });
        setEmail(res.data.email);
    };

    return (
        <div id="RouteApp" className="bg-neutral h-screen p-4">
            {email ? <div>Your email is: {email}</div> : <div>Loading...</div>}
        </div>
    );
};

export default RouteApp;
