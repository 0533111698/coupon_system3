import { useForm } from "react-hook-form";
import "./AddCoupon.css";
import Coupon from "../../../Models/Coupon";
import { useNavigate } from "react-router-dom";
import companyService from "../../../Services/CompanyService";
import notificationsService from "../../../Services/NotificationsService";
import Category from "../../../Models/Category";
import Company from "../../../Models/Company";
import { error } from "console";
import { useEffect, useState } from "react";


function AddCoupon(): JSX.Element {
    const{register,handleSubmit,formState}=useForm<Coupon>();
    const navigate=useNavigate();
    const categories=Object.values(Category).filter((c)=>isNaN(Number(c)));
    const[getcompany,setCompany]=useState<Company>();
    const[getCoupon,setCoupon]=useState<Coupon>();
    useEffect(()=>{
        companyService.getCompanyDetails()
        .then(comp=>{
            console.log("hi")
            setCompany(comp);
        })
    },[])

    function sendCoupon(coupon:Coupon){
      //  coupon.image=(coupon.image as FileList)[0];;
    
        coupon.image = null;
        companyService.addCoupon(coupon)
        .then(newCoup=>{
            notificationsService.success("coupon added!")
           // navigate("/coupon/"+newCoup.id);
        }).catch((err:any)=>notificationsService.error(err));
    }
    

 
    return (
        <div className="AddCoupon" onSubmit={handleSubmit(sendCoupon)}>
            <form >
			                <h2>Add New Coupon:</h2>
                            
                {/*<input type="text" placeholder=" company " {...register("company")} /><br/> */}
                {/* <label htmlFor="name">Name:</label> */}
                <select id="category"  defaultValue={Category.FOOD}{...register("category", {
                    required: { value: true, message: "clientType is required" }
                })}>
                    {categories.map((value,key)=>
                    <option key={key}>{value}</option>
                   ) }
                </select><br/>
                <input type="text" placeholder=" title " {...register("title")} /><br/> 
                <input type="text" placeholder=" description " {...register("description")} /><br/>
                <input type="date" placeholder="start-date" {...register("startDate")} /><br/>
                <input type="date" placeholder="end-date"{...register("endDate")} /><br/>
                <input type="number" placeholder="amount"{...register("amount",{
                    required:{value:true,message:"requierd field!"},
                    min:{value:0,message:"Amount must be possitive!"}
                })} /><br/>
                <span>{formState.errors?.amount?.message}</span><br/>
                <input type="number" placeholder="price"{...register("price",{
                    required:{value:true,message:"requierd field!"},
                    min:{value:0,message:"do you want to sell free????"}
                })} /><br/>
                <span>{formState.errors?.price?.message}</span><br/>
              
                <input type="file" {...register("image")} /><br/>
                <input type="submit" value="AddCoupon" /><br/>
                </form>
        </div>
    );
}

export default AddCoupon;
