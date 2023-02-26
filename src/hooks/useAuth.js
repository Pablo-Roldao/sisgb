import { useContext } from "react";
import AuthContext from "../current/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;