import { useEffect, useState } from "react";
import "./CustomerCoupons.css";
import customerService from "../../../Services/CustomerService";
import Coupon from "../../../Models/Coupon";
import { error } from "console";
import notificationsService from "../../../Services/NotificationsService";
import CustomerCouponCard from "../CustomerCouponCard/CustomerCouponCard";

function CustomerCoupons(): JSX.Element {
    const[coupons,setCoupons]=useState<Coupon[]>();
    useEffect(()=>{
        customerService.getCustomerCoupons()
        .then((coup)=>{
            setCoupons(coup);
        })
        .catch(error=>notificationsService.error(error))

    },[])
    return (
        <div className="CustomerCoupons">
			{coupons&&coupons.length===0 &&
            <>
            <h1>oh no your cart is empty 🙄</h1>
            </>
            }
            {coupons&&coupons.map(c=><CustomerCouponCard key={c.id}coupon={c}/>)

            }
        </div>
    );
}

export default CustomerCoupons;
