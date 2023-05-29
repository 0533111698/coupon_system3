import { NavLink, useNavigate } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import "./CouponCard.css";
import { useEffect, useState } from "react";
import { couponsStore } from "../../../store/CouponsState";
import { authStore } from "../../../store/AouthState";
import { Button, IconButton } from "@mui/material";
import { ShoppingCartRounded } from "@mui/icons-material";
interface CouponProps{
    coupon:Coupon
}

function CouponCard(props:CouponProps): JSX.Element {
    const[clientType,setClientType]=useState<string>();
    //const[coupon,setCoupon]=useState<Coupon>();
    const navigat=useNavigate();
    useEffect(()=>{
        //setCoupon(props.coupon)
        
        setClientType(authStore.getState().clientType);
        const unsubscribe=authStore.subscribe(()=>{
            setClientType(authStore.getState().clientType);
        })
        return (()=>{
            unsubscribe();
        })
    
    },[])
    function toCouponPurchase(){
        navigat("/customer/purchase/"+props.coupon.id)
    }
    return (
        <div className="CouponCard">
			<NavLink to={"/coupons/"+props.coupon.id}>
                <h2>{props.coupon.title}</h2>
                
            </NavLink>
            <p>{props.coupon.description}</p>
            <img src={props.coupon.image} alt="" />
           
            {clientType==="Customer"&&<>
            <Button onClick={toCouponPurchase} variant="text" startIcon={<ShoppingCartRounded />}>
            For purchase
                      </Button>
                      </>
            
            
}

            
      
        </div>
    );
}

export default CouponCard;
