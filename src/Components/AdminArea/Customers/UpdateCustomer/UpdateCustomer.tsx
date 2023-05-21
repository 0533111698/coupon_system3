import { useForm } from "react-hook-form";
import "./UpdateCustomer.css";
import Customer from "../../../../Models/Customer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import adminService from "../../../../Services/AdminService";
import { error } from "console";
import notificationsService from "../../../../Services/NotificationsService";


function UpdateCustomer(): JSX.Element {
    const{register, handleSubmit,formState,setValue}=useForm<Customer>();
    const id:number=+useParams().custId;
    const navigate=useNavigate();
    const[customer,setCustomer]=useState<Customer>();

    useEffect(()=>{
        adminService.getOneCustomer(id)
        .then(cust=>{
            setValue("firstName",cust.firstName);
            setValue("lastName",cust.lastName);
            setValue("email",cust.email);
            setValue("password",cust.password);
            setCustomer(cust);
        })
    },[])
    function sendCustomer(customer: Customer){
       customer.id= id;
       adminService.updateCustomer(customer)
       .then(()=>{
        notificationsService.success("customer update!")
        navigate("/customers/"+id)
       })
       .catch(error=>notificationsService.error(error));
    }

          
    return (
        <div className="UpdateCustomer">
						<form onSubmit={handleSubmit(sendCustomer)}>
                <h1>Update Customer</h1>
                <input type="text"placeholder="Enter first name here"{...register("firstName",{
                    required:{value:true,message:"Required field"}
                })} /><br/>
                <span>{formState.errors?.firstName?.message}</span><br />
                <input type="text"placeholder="Enter last name here"{...register("lastName",{
                    required:{value:true,message:"Required field"},minLength:{value:2,message:""}
                })} /><br/>
                <span>{formState.errors?.lastName?.message}</span><br />
                <input type="email" placeholder="Enter email here"{...register("email",{
                    required:{value:true,message:"Required field"}
                })} /> <br />
                <span>{formState.errors?.email?.message}</span><br />
                <input type="password" placeholder="Enter password here"{...register("password",{
                    required:{value:true,message:"Required field"}
                })} /><br/>
                <span>{formState.errors?.password?.message}</span><br />
                <input type="submit" value="Update" />
                </form>
        </div>
    );
}

export default UpdateCustomer;
