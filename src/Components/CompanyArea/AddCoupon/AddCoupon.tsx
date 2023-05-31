import { useForm } from "react-hook-form";
import "./AddCoupon.css";
import Coupon from "../../../Models/Coupon";
import { useNavigate, useParams } from "react-router-dom";
import companyService from "../../../Services/CompanyService";
import notificationsService from "../../../Services/NotificationsService";
import Category from "../../../Models/Category";
import { useEffect, useState } from "react";
import { couponsStore } from "../../../store/CouponsState";



function AddCoupon(): JSX.Element {
    
    const{register,handleSubmit,formState}=useForm<Coupon>();
    const navigate=useNavigate();
    const categories=Object.values(Category).filter((c)=>isNaN(Number(c)));
    const id:number=+useParams().couponId;
    const[base64Image,setImage]=useState<String>('');
    const[getCoupons,setCoupons]=useState<Coupon[]>(couponsStore.getState().coupons);
    useEffect(()=>{
        companyService.getAllCompanyCoupons()
        .then((coups)=>setCoupons(coups))
        .catch(err=>notificationsService.error);
    })
 

    function sendCoupon(coupon:Coupon){
        coupon.id=id;
        coupon.image=base64Image;
        companyService.addCoupon(coupon)
        .then(newCoup=>{
            notificationsService.success("coupon added!")
            setTimeout(()=>{
                navigate("/coupons");
            },1000)
         
        }).catch((err)=>notificationsService.error(err));
    }
   const toBase64=(file:File)=>new Promise<string|ArrayBuffer>((resolve, reject) => {
    const reader =new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>resolve(reader.result);
    reader.onerror=reject;
   })
    const handleFileChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    toBase64(event.target.files[0]).then(base64=>setImage(base64 as string))
   }
 
    return (
        <div className="AddCoupon" onSubmit={handleSubmit(sendCoupon)}>
            <form >
			                <h2>Add New Coupon:</h2>

                <select id="category"  defaultValue={Category.FOOD}{...register("category", {
                    required: { value: true, message: "Missing category" }
                })}>
                    {categories.map((value,key)=>
                    <option key={key}>{value}</option>
                   ) }
                </select><br/>
                <input type="text" placeholder=" title " {...register("title",{
                    required:{value:true,message:"Missing title"},minLength:{value:1,message:"Title is too short"}
                })} /> <br />
                <span>{formState.errors?.title?.message}</span>
                <br/> 
                <input type="text" placeholder=" description " {...register("description",{
                    required:{value:true,message:"Missing description"},minLength:{value:1,message:"description too short..."}
                })} /><br/>
                <span>{formState.errors?.description?.message}</span>
                <br />
                start date: <input type="date" placeholder="start-date" {...register("startDate",{
                    required:{value:true,message:"Missing start date"}
                })} /><br/>
                <span>{formState.errors?.startDate?.message}</span> <br />
                end date: <input type="date" placeholder="end-date"{...register("endDate",{
                    required:{value:true,message:"Missing end date"}}
                )} /><br/>
                <span>{formState.errors?.endDate?.message}</span>
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
              
                <input type="file"onChange={handleFileChange}/><br/>
                
                <input type="submit" value="AddCoupon" /><br/>
                </form>
                
        </div>
    );
}

export default AddCoupon;
