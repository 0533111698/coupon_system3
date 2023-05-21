import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/customers">Customers</NavLink>   <span>        </span>
            <NavLink to="/companies">Companies</NavLink><span>        </span>
            <NavLink to="/company/add">addCompany</NavLink><span>        </span>
            <NavLink to="/customer/add">addCustomer</NavLink><span>        </span>
            <NavLink to="/coupon/add">addCoupon</NavLink><span>        </span>

            <NavLink to="/coupons">Coupons</NavLink><span></span>   
        </div>
    );
}

export default Menu;
