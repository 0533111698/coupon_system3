import { useForm } from "react-hook-form";
import Company from "../../../../Models/Company";
import "./AddCompany.css";
import { useNavigate } from "react-router-dom";
import adminService from "../../../../Services/AdminService";
import notificationsService from "../../../../Services/NotificationsService";
import { Save } from "@mui/icons-material";
import { useEffect, useState } from "react";

function AddCompany(): JSX.Element {
    const {register, handleSubmit,formState}=useForm<Company>();
    const[ompanies,setCompanies]=useState<Company[]>();
    const navigate=useNavigate();
    useEffect(()=>{
        adminService.getAllCompanies()//if you choose add company befor chosing:get all companies, the state.lenth will be more than 0... 
        .then((comp)=>{
            setCompanies(comp);
        })
        .catch(err=>notificationsService.error(err))

    },[])
    function sendCompany(company:Company){
       adminService.addCompany(company)
       .then(newcomp=>{
        notificationsService.success("company added!");
        navigate("/company/"+newcomp.id);
       } )
       .catch(err=>{
        notificationsService.error(err.message);
       })
    }
    return (
        <div className="AddCompany">
			<form onSubmit={handleSubmit(sendCompany)}>
                <h1>Add new Company</h1>
                <input type="text"placeholder="Enter name here"{...register("name",{
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
                <button name="add" type="submit"><Save fontSize="large"/> Save</button>

            </form>
        </div>
    );
}

export default AddCompany;
