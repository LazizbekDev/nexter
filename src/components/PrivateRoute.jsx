import {Outlet, Navigate} from "react-router-dom";
import { useAuthStatus } from "./useAuthStatus";
import {ImSpinner3} from "react-icons/im";

const PrivateRoute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus()

    if ( checkingStatus ) {
        return <div className={'loader'}>
            <ImSpinner3 />
        </div>
    } else if (loggedIn) {
        return <Outlet />
    } else {
        return <Navigate to={'/login'} replace />
    }
};

export default PrivateRoute;