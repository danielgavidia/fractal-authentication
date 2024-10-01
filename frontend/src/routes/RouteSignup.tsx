import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

const RouteSignup = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setUsername("");
            setPassword("");
            const res = await axios({
                method: "POST",
                url: `${BASE_URL}/signup/`,
                data: {
                    username: username,
                    password: password,
                    email: email,
                    address: address,
                },
            });
            navigate("/app", { state: { token: res.data.token } });
            console.log("Submission success");
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    return (
        <div id="RouteSignup" className="bg-neutral h-screen p-4">
            <div>
                <form className="flex-row" onSubmit={handleSubmit}>
                    <div className="mb-2 ">
                        <input
                            type="text"
                            value={username}
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
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
                            value={address}
                            placeholder="address"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="btn mb-2">
                        <button>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RouteSignup;
