import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";

export default function GuestLayout() {
    const {token} = useStateContext()

    if(token) {
        return <Navigate to='/user' />
    }

    return (
        <div>
            <div>
                For guest users only
                {/* child route */}
                <Outlet />
            </div>
        </div>
    )
}