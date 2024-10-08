import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"


const RouteLogin = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();

    const handleFirebaseSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const idToken = await userCredential.user.getIdToken()
            const res = await axios({
                method: "POST",
                url: `${import.meta.env.VITE_EXPRESS_BASE_URL}/login`,
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            })
            setEmail("")
            setPassword("")
            navigate("/app/home", { state: { idToken: res.data.idToken } })
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <div id="RouteLogin" className="bg-neutral h-screen p-4">
            <div>
                <form className="flex-row" onSubmit={handleFirebaseSignIn}>
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
                        <button>Login</button>
                    </div>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default RouteLogin;
