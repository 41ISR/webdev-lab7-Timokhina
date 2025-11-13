import { Outlet } from "react-router"
import NavBar from "../components/NavBar"

const Layout = () => {
    return (
        <div className="container">
            <NavBar />
            <Outlet />
        </div>
    )
}
export default Layout