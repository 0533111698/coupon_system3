import { useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import "./Coupons.css";
import companyService from "../../../Services/CompanyService";
import notificationsService from "../../../Services/NotificationsService";
import CouponCard from "../CouponCard/CouponCard";

function Coupons(): JSX.Element {
    const[getCoupons,setCoupons]=useState<Coupon[]>([]);
    useEffect(()=>{
        companyService.getAllCompanyCoupons()
        .then((coups)=>{
            setCoupons(coups)
        })
        .catch(error=>notificationsService.error(error))
    })
    return (
        <div className="Coupons">
			{!getCoupons&&getCoupons.map(c=><CouponCard key={c.id}coupon={c}/>)}
        </div>
    );
}

export default Coupons;
