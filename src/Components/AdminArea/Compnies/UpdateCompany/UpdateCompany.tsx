import { useNavigate, useParams } from "react-router-dom";
import "./UpdateCompany.css";
import { useEffect, useState } from "react";
import Company from "../../../../Models/Company";
import adminService from "../../../../Services/AdminService";
import { useForm } from "react-hook-form";
import notificationsService from "../../../../Services/NotificationsService";

function UpdateCompany(): JSX.Element {
    const {register, handleSubmit, formState, setValue} = useForm<Company>();
    const id: number=+useParams().compId;
    const navigate=useNavigate();
    const [company,setCompany]=useState<Company>();
    
    useEffect(()=>{

        adminService.getOneCompany(id)
        .then(comp=>{
            setValue("name",comp.name);
            setValue("email",comp.email);
            setValue("password",comp.password)
        })
    })
    function sendCompany(company:Company){
    company.id=id;
       adminService.updateCompany(company)
        .then(() => {
            notificationsService.success("Company Update")
            navigate("/company/"+id);
        })
        .catch(error=>notificationsService.error(error));
    }

    return (
        <div className="UpdateCompany">
        <form onSubmit={handleSubmit(sendCompany)}>
            <h1>Update Company</h1>
            <input type="text" disabled placeholder="Enter name here" {...register("name",{
                required:{value:true,message:"Required field"}
            })} /><br/>
            <span>{formState.errors?.name?.message}</span><br />
            <input type="email" placeholder="Enter email here"{...register("email",{
                required:{value:true,message:"Required field"}
            })} /> <br />
            <span>{formState.errors?.email?.message}</span><br />
            <input type="password" placeholder="Enter password here"{...register("password",{
                required:{value:true,message:"Required field"}
            })} /><br/>
            <span>{formState.errors?.password?.message}</span><br />
            <button name="add" type="submit">Update Company</button>

        </form>
    </div>
    );
}

export default UpdateCompany;
