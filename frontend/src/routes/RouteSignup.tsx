import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"


const RouteSignup = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();

    const handleFirebaseSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const userCrendential = await createUserWithEmailAndPassword(auth, email, password)
            const token = await userCrendential.user.getIdToken()
            const res = await axios({
                method: "POST",
                url: `${import.meta.env.VITE_EXPRESS_BASE_URL}/signup`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setEmail("")
            setPassword("")
            navigate("/app", { state: { idToken: res.data.idToken } })
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <div id="RouteSignup" className="bg-neutral h-screen p-4">
            <div>
                <form className="flex-row" onSubmit={handleFirebaseSignUp}>
                    <div className="mb-2 ">
                        <input
                            type="text"
                            value={email}
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2 ">
                        <input
                            type="text"
                            value={password}
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="btn mb-2">
                        <button>Sign Up</button>
                    </div>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default RouteSignup;
