import { Link, Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div>
            <div className="navbar p-4">
                <Link to="/home" className="flex-1">
                    Fractal Auth
                </Link>
                <Link to="/home" className="btn ml-2">
                    Home
                </Link>
                <Link to="/login" className="btn ml-2">
                    Login
                </Link>
                <Link to="/signup" className="btn ml-2">
                    Signup
                </Link>
            </div>
            <Outlet />
        </div>
    );
};

export default Root;
