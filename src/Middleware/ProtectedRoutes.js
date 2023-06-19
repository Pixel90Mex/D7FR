import { Outlet } from "react-router-dom";
import useSession from '../Hooks/useSession.js';
import Login from '../Pages/Login';

const ProtectedRoutes = () => {
    const session = useSession();
    return session ? <Outlet /> : <Login />;
}

export default ProtectedRoutes;
