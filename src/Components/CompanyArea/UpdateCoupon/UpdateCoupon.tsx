import { useForm } from "react-hook-form";
import Coupon from "../../../Models/Coupon";
import "./UpdateCoupon.css";
import companyService from "../../../Services/CompanyService";
import { useEffect, useState } from "react";
import notificationsService from "../../../Services/NotificationsService";
import { useNavigate, useParams } from "react-router-dom";
import Category from "../../../Models/Category";

function UpdateCoupon(): JSX.Element {
    const{register,handleSubmit,formState,setValue}=useForm<Coupon>();
    const categories=Object.values(Category).filter((c)=>isNaN(Number(c)));
    const[base64Image,setImage]=useState<String>('');
    const id: number=+useParams().coupId;
    const navigate=useNavigate();
    useEffect(()=>{
        companyService.getOneCoupon(id)
        .then(coup=>{
            setValue("category",coup.category);
            setValue("title",coup.title);
            setValue("description",coup.description)
            setValue("startDate",coup.startDate);
            setValue("endDate",coup.endDate);
            setValue("amount",coup.amount)
            setValue("price",coup.price)
            setValue("image",coup.image)

        })
        .catch(err=>notificationsService.error(err))
    })
    function sendCoupon(coupon:Coupon){
        coupon.id=id;
        coupon.image=base64Image;
        companyService.updateCoupon(coupon)
        .then(newCoup=>{
            notificationsService.success("coupon updated!")
            navigate("/coupons/"+id);
        }).catch((err:any)=>notificationsService.error(err));
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
        <div className="UpdateCoupon"  onSubmit={handleSubmit(sendCoupon)}>
            <form >
			                <h2>Update Coupon:</h2>
                            
                            
                {/*<input type="text" placeholder=" company " {...register("company")} /><br/> */}
                {/* <label htmlFor="name">Name:</label> */}
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
                <input type="date" placeholder="start-date" {...register("startDate",{
                    required:{value:true,message:"Missing start date"}
                })} /><br/>
                <span>{formState.errors?.startDate?.message}</span> <br />
                <input type="date" placeholder="end-date"{...register("endDate",{
                    required:{value:true,message:"Missing end date"}
                })} /><br/>
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
                
                <input type="submit" value="UpdateCoupon" /><br/>
                </form>
                
        </div>
    );
}

export default UpdateCoupon;
