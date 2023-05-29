
import { ChangeEvent, FormEvent, MouseEventHandler, useEffect, useState } from "react";
import Category from "../../../Models/Category";
import "./CouponList.css";
import Coupon from "../../../Models/Coupon";
import { couponsStore } from "../../../store/CouponsState";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";
import customerService from "../../../Services/CustomerService";
import notificationsService from "../../../Services/NotificationsService";

function CouponList(): JSX.Element {
    useEffect(()=>{
        customerService.getAllCoupons()
        .then(coups=>(setAllCoupons(coups)))
        .catch(err=>(notificationsService.error(err)))
    },[])
    const[allCoupons,setAllCoupons]=useState<Coupon[]>(couponsStore.getState().allCoupons);
    const[maxPriceSelect,setMaxPriceSelect]=useState<number>(0);

    
    function changeList(event:FormEvent<HTMLButtonElement>){
        let currentCategory=event.currentTarget.value;
       setAllCoupons( couponsStore.getState().allCoupons.filter((coup)=>{
            return coup.category===currentCategory}))
    }
    function maximumPrice(event:ChangeEvent<HTMLInputElement>){
        let maxPrice=event.currentTarget.value;
        setMaxPriceSelect(Number(maxPrice))
        setAllCoupons(couponsStore.getState().allCoupons.filter((coup)=>{
            return coup.price<=Number(maxPrice);
        }))
    }
    
    return (
        <div className="CouponList">
			<button type="submit" value={Category.FOOD} onClick={changeList}>food</button> 
            <button type="submit" value={Category.BEVERAGES} onClick={changeList}>BEVERAGES</button> 
            <button type="submit" value={Category.ELECTRICITY} onClick={changeList}>ELECTRICITY</button> 
            <button type="submit" value={Category.SPA} onClick={changeList}>SPA</button> 
            <button type="submit" value={Category.SPORT} onClick={changeList}>SPORT</button> 
            <button type="submit" value={Category.TRAVEL} onClick={changeList}>TRAVEL</button> 
            <button type="submit" value={Category.VACATION} onClick={changeList}>VACATION</button>
            <form > 
                <input type="number"  onChange={maximumPrice} value={maxPriceSelect}/>
            </form>
            {allCoupons.length>0 && allCoupons.map(c=><CouponCard key={c.id}coupon={c}/>)}
            {allCoupons.length===0 && <>
            <span>There are no coupons</span>
            </>}
            <h1>ssdks</h1>
            
        </div>
    );
}

export default CouponList;
