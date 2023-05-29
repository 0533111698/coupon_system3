import { useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import "./CouponDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import companyService from "../../../Services/CompanyService";
import notificationsService from "../../../Services/NotificationsService";
import { authStore } from "../../../store/AouthState";
import customerService from "../../../Services/CustomerService";

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
        companyService.deleteCoupon(id)
        .then(()=>{
            notificationsService.success("deleted succes");
            //window.location.reload();
            navigate("/coupons");
        })
        .catch(err=>notificationsService.error(err.message));
    }
    function updateMe(){
        navigate("/coupons/edit/" +id);
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
			<h2>{coupon?.title}</h2>
            <p>{coupon?.description}</p>
            <p>{coupon?.category}</p>
            <p>{coupon?.price}</p>
            <p>{coupon?.amount}</p>
            <p>{coupon?.endDate.toString()}</p>
            <button onClick={deleteMe}>🗑</button>
            <button onClick={updateMe}>✏</button>
        </div>
    );
}

export default CouponDetails;
