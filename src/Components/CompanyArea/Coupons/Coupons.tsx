import { useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import "./Coupons.css";
import companyService from "../../../Services/CompanyService";
import notificationsService from "../../../Services/NotificationsService";
import CouponCardCompany from "../CouponCardCompany/CouponCardCompany";

function Coupons(): JSX.Element {
    const[getCoupons,setCoupons]=useState<Coupon[]>([]);
    useEffect(()=>{
        companyService.getAllCompanyCoupons()
        .then((coups)=>{
            setCoupons(coups)
        })
        .catch(error=>notificationsService.error(error))
    },[])
    return (
        <div className="Coupons">
			{ getCoupons.map(c=><CouponCardCompany key={c.id}coupon={c}/>)}
            {getCoupons.length==0&&<h1>You have no coupons🙄</h1>}
        </div>
    );
}

export default Coupons;
