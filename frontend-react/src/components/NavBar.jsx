import { Link } from "react-router"

const NavBar = () => {
    return(
        <div className="navbar">
            <div className="navbar-container">
                <h2 className="navbar-brand">Feedback</h2>
                <ul className="navbar-nav">
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default NavBar