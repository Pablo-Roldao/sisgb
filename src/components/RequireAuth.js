import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const findCommonElement = (array1, array2) => {
    return array1.some(item => array2.includes(item));
}

function RequireAuth(props) {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        auth?.roles
            ? findCommonElement(auth?.roles, props.allowedRoles)
                ? <Outlet />
                : <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;