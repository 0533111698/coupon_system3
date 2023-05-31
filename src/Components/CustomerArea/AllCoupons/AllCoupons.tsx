import { useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import "./AllCoupons.css";
import customerService from "../../../Services/CustomerService";
import notificationsService from "../../../Services/NotificationsService";
import CouponCard from "../CouponCard/CouponCard";

function AllCoupons(): JSX.Element {
    const [allCoupons,setAllCoupons]=useState<Coupon[]>([]);
    useEffect(()=>{
        customerService.getAllCoupons()
        .then((coupons)=>setAllCoupons(coupons))
        .catch(error=>notificationsService.error(error))
    },[])
    return (
        <div className="AllCoupons">
			{allCoupons.map(c=><CouponCard key={c.id}coupon={c}/>)}
        </div>
    );
}

export default AllCoupons;
