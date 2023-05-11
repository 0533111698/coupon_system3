import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/customers">Customers</NavLink><br/>
            <NavLink to="/companies">Companies</NavLink><br/>
            <NavLink to="/company/add">addCompany</NavLink><br/>
        </div>
    );
}

export default Menu;
