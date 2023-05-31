import { useNavigate } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import customerService from "../../../Services/CustomerService";
import notificationsService from "../../../Services/NotificationsService";
import "./CustomerCouponCard.css";
interface CouponProps{
 coupon:Coupon
}

function CustomerCouponCard(props:CouponProps): JSX.Element {
    const navigate=useNavigate();
    
    function deletePurchase(){
        customerService.deletePurchaseCoupon(props.coupon)
        .then(()=>{
            notificationsService.success("Coupon Deleted!");
            navigate("/")

        })
        .catch(err=>notificationsService.error(err));
    }
    return (
        <div className="CustomerCouponCard">
            {}
			<h1>{props.coupon.title}</h1>
            <h2>{props.coupon.price}</h2>
            <h2>{props.coupon.endDate.toString()}</h2>
            <button onClick={deletePurchase}>🗑</button>
        </div>
    );
}

export default CustomerCouponCard;
function uaeParams() {
    throw new Error("Function not implemented.");
}

