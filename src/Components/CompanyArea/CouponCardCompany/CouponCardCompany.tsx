import { useNavigate } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import "./CouponCardCompany.css";
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';

interface CouponProps{
    coupon:Coupon
}

function CouponCardCompany(props:CouponProps): JSX.Element {
    const navigate=useNavigate();
    function toCouponDetails(){
        navigate("/coupons/"+props.coupon.id)
    }
    return (
        <div className="CouponCardCompany">
			              <img src={props.coupon.image} alt="" />
                <h2>{props.coupon.title}</h2>
            <p>{props.coupon.description}</p>
            Category: <span>{props.coupon.category}</span><br />
            Price: <span>{props.coupon.price}$</span> <br />
            <Button onClick={toCouponDetails} variant="text" startIcon={<CreateIcon />}>
            to edit
                      </Button>
        </div>
    );
}

export default CouponCardCompany;
