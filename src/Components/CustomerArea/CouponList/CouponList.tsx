
import { ChangeEvent, FormEvent, MouseEventHandler, useEffect, useState } from "react";
import Category from "../../../Models/Category";
import "./CouponList.css";
import Coupon from "../../../Models/Coupon";
import { couponsStore } from "../../../store/CouponsState";
import CouponCard from "../CouponCard/CouponCard";
import customerService from "../../../Services/CustomerService";
import notificationsService from "../../../Services/NotificationsService";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LiquorIcon from '@mui/icons-material/Liquor';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import HouseboatIcon from '@mui/icons-material/Houseboat';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { Button } from "@mui/material";

function CouponList(): JSX.Element {
    useEffect(()=>{
        customerService.getAllCoupons()
        .then(coups=>(setAllCoupons(coups)))
        .catch(err=>(notificationsService.error(err)))
    },[])
    const[allCoupons,setAllCoupons]=useState<Coupon[]>(couponsStore.getState().allCoupons);
    const[maxPriceSelect,setMaxPriceSelect]=useState<number>(0);
    const[category,setCategory]=useState<string>();

    
    function changeList(event:FormEvent<HTMLButtonElement>){
        let currentCategory=event.currentTarget.value;
        setCategory(currentCategory);
        {currentCategory==="All"&&
        setAllCoupons(couponsStore.getState().allCoupons);}
        {currentCategory!="All" &&maxPriceSelect===0 && setAllCoupons( couponsStore.getState().allCoupons.filter((coup)=>{
            return coup.category===currentCategory}))}
        // {currentCategory!="All" && maxPriceSelect!=0 && setAllCoupons( couponsStore.getState().allCoupons.filter((coup)=>{
        //         return ( coup.category===currentCategory&&coup.price<=maxPriceSelect)}))}
       
    }
    function maximumPrice(event:ChangeEvent<HTMLInputElement>){
        let maxPrice=event.currentTarget.value;
        setMaxPriceSelect(Number(maxPrice));
        if(maxPriceSelect!=0){
        setAllCoupons(couponsStore.getState().allCoupons.filter((coup)=>{
            return coup.price<=Number(maxPrice);
        }))}    
       
    }
    

    
    return (
        <div className="CouponList">
			<Button type="submit" value={Category.FOOD} onClick={changeList}><RestaurantMenuIcon/>FOOD</Button> <span>|</span>
            <Button type="submit" value={Category.BEVERAGES} onClick={changeList}><LiquorIcon/>BEVERAGES</Button> <span>|</span>
            <Button type="submit" value={Category.ELECTRICITY} onClick={changeList}><ElectricalServicesIcon/>ELECTRICITY</Button> <span>|</span>
            <Button type="submit" value={Category.SPA} onClick={changeList}><AirlineSeatReclineExtraIcon/>SPA</Button> <span>|</span>
            <Button type="submit" value={Category.SPORT} onClick={changeList}><SportsBasketballIcon/>SPORT</Button> <span>|</span>
            <Button type="submit" value={Category.TRAVEL} onClick={changeList}><CardTravelIcon/>TRAVEL</Button> <span>|</span>
            <Button type="submit" value={Category.VACATION} onClick={changeList}><HouseboatIcon/>VACATION</Button><span>|</span>
            <Button type="submit" value="All" onClick={changeList}><CardGiftcardIcon/>All</Button><span>|</span>
            <form > 
               Until price: <input type="number" id="num" value={maxPriceSelect}min={0} onChange={maximumPrice}/>
        
            </form>
            {allCoupons.length>0 && allCoupons.map(c=><CouponCard key={c.id}coupon={c}/>)}
            {allCoupons.length===0 && <>
            <h1>There are no coupons for in  🙄</h1>
            </>}
           
            
        </div>
    );
}

export default CouponList;
