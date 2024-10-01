import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "./contexts/AuthProvider";
import { useContext } from "react";
import { auth } from "./firebaseConfig"

const Root = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return null
    }
    const { user } = authContext
    const handleSignOut = async () => {
        await auth.signOut()
    }
    return (
        <div>
            <div className="navbar p-4">
                <Link to="/home" className="flex-1">
                    Fractal Auth
                </Link>
                {user ? (
                    <>
                        <Link to="/app/home" className="btn ml-2">
                            Home
                        </Link>
                        <button onClick={handleSignOut} className="btn ml-2">Sign Out</button>
                    </>
                ) : (
                    <>
                        <Link to="/home/login" className="btn ml-2">
                            Login
                        </Link>
                        <Link to="/home/signup" className="btn ml-2">
                            Signup
                        </Link>
                    </>
                )}
            </div>
            <Outlet />
        </div>
    );
};

export default Root;
