import { NavLink, useNavigate } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import "./CouponCard.css";
interface CouponProps{
    coupon:Coupon
}

function CouponCard(props:CouponProps): JSX.Element {
    const navigate=useNavigate();
    return (
        <div className="CouponCard">
			<NavLink to={"/coupons/"+props.coupon.id}>
                <h2>{props.coupon.title}</h2>
            </NavLink>
            <p>{props.coupon.description}</p>
      
        </div>
    );
}

export default CouponCard;
