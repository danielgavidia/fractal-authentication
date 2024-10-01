import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Outlet } from 'react-router-dom';

const RouteAppLayout = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
            } else {
                navigate('/login', { replace: true })
            }
        })
    }, []);

    return <Outlet />;
};

export default RouteAppLayout;