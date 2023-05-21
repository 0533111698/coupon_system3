import { useEffect, useState } from "react";
import "./CompanyDetails.css";
import Company from "../../../../Models/Company";
import { useNavigate, useParams } from "react-router-dom";
import adminService from "../../../../Services/AdminService";
import notificationsService from "../../../../Services/NotificationsService";

function CompanyDetails(): JSX.Element {
    const [company,setCompany]=useState<Company>();
    const id:number=+useParams().companyId;
    const navigate=useNavigate();
    useEffect(()=>{
        adminService.getOneCompany(id)
        .then(c=>setCompany(c))
        .catch(error=>notificationsService.error(error))
    },[])
    
    
   
    function deleteMe(){
        adminService.deleteCompany(id)
        .then(()=>{
            notificationsService.success("deleted succes");
            //window.location.reload();
            navigate("/companies");
        })
        .catch(err=>notificationsService.error(err.message));
    }
    function updateMe(){
        navigate("/companies/edit/" +id);
    }
    return (
        <div className="CompanyDetails">
			<h1>{company?.name}</h1>
            <h2>{company?.email}</h2>
            <button onClick={deleteMe}>🗑</button>
            <button onClick={updateMe}>✏</button>
            
        </div>
    );
}

export default CompanyDetails;
