import { useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import "./CouponPurchase.css";
import { useNavigate, useParams } from "react-router-dom";
import companyService from "../../../Services/CompanyService";
import notificationsService from "../../../Services/NotificationsService";
import { authStore } from "../../../store/AouthState";
import customerService from "../../../Services/CustomerService";

import { Button, IconButton } from "@mui/material";
import { ShoppingCartRounded } from "@mui/icons-material";
function CouponPurchase(): JSX.Element {
    const[coupon,setCoupon]=useState<Coupon>();
    const[clientType,setClientType]=useState<string>();
    const id:number=+useParams().couponId;
    const navigate=useNavigate();
    useEffect(()=>{
        companyService.getOneCoupon(id)
        .then(c=>setCoupon(c))
        .catch(err=>notificationsService.error(err));
        setClientType(authStore.getState().clientType);
        const unsubscribe=authStore.subscribe(()=>{
            setClientType(authStore.getState().clientType);
        })
        return (()=>{
            unsubscribe();
        })
    
    },[])
    

    function purchaseCoupon(){
        customerService.purchaseCoupon(coupon)
        .then(()=>{
            notificationsService.success("coupon purchase!")
            navigate("/")
        })
        .catch((err)=>notificationsService.error(err))
    }
    return (
        <div className="CouponPurchase">
			<h2>{coupon?.title}</h2>
            <p>{coupon?.description}</p>
            <p>{coupon?.category}</p>
            <p>{coupon?.price}</p>
            <p>There are only: {coupon?.amount}</p>
            <p>{coupon?.endDate.toString()}</p>
            {
                clientType==="Customer"&&<>
                <Button onClick={purchaseCoupon} variant="text" startIcon={<ShoppingCartRounded />}>
                    Buy now
                      </Button>
                     
                </>
            }
        </div>
    );
}

export default CouponPurchase;




    

