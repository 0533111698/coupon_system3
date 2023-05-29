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
    const[base64Image,setImage]=useState<String>('');
    const[getcompany,setCompany]=useState<Company>();
    const[getCoupon,setCoupon]=useState<Coupon>();
    useEffect(()=>{
        companyService.getCompanyDetails()
        .then(comp=>{
            setCompany(comp);
        })
        .catch(err=>notificationsService.error);
    },[])

    function sendCoupon(coupon:Coupon){
        coupon.image=base64Image;
        companyService.addCoupon(coupon)
        .then(newCoup=>{
            notificationsService.success("coupon added!")
           // navigate("/coupon/"+newCoup.id);
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
              
                <input type="file"onChange={handleFileChange}/><br/>
                
                <input type="submit" value="AddCoupon" /><br/>
                </form>
                
        </div>
    );
}

export default AddCoupon;
