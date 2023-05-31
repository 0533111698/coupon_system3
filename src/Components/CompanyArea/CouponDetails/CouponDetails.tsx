import { useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import "./CouponDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import companyService from "../../../Services/CompanyService";
import notificationsService from "../../../Services/NotificationsService";
import { authStore } from "../../../store/AouthState";
import customerService from "../../../Services/CustomerService";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';

function CouponDetails(): JSX.Element {
    const[coupon,setCoupon]=useState<Coupon>();
    const id:number=+useParams().couponId;
    const navigate=useNavigate();
    useEffect(()=>{
        companyService.getOneCoupon(id)
        .then(c=>setCoupon(c))
        .catch(err=>notificationsService.error(err));    
    },[])
    
    function deleteMe(){
        coupon.id=id;
        companyService.deleteCoupon(id)
        .then(()=>{
            notificationsService.success("deleted succes");
            //window.location.reload();
            navigate("/coupons");
        })
        .catch(err=>notificationsService.error(err.message));
    }
    function updateMe(){
        coupon.id=id
        navigate("/company/edit/" +id);
    }
    function deletePurchase(){
        customerService.purchaseCoupon(coupon)
        .then(()=>{
            notificationsService.success("coupon purchase!")
            navigate("/")
        })
        .catch((err)=>notificationsService.error(err))
    }
    return (
        <div className="CouponDetails">
            <img src={coupon?.image} alt="" />
			<h2>{coupon?.title}</h2>
            <p>{coupon?.description}</p> <br />
            Category : <span>{coupon?.category}</span> <br />
            Price : <span>{coupon?.price}</span> <br />
            Amount : <span>{coupon?.amount}</span> <br />
            Start date: <span>{coupon?.startDate.toString()}</span> <br />
            End date: <span>{coupon?.endDate.toString()}</span> <br />
            <button onClick={deleteMe}><DeleteIcon/></button>
            <button onClick={updateMe}><ModeIcon/></button>
        </div>
    );
}

export default CouponDetails;
