import { useEffect, useState } from "react";
import "./CompanyDetails.css";
import Company from "../../../../Models/Company";
import { useParams } from "react-router-dom";
import adminService from "../../../../Services/AdminService";
import notificationsService from "../../../../Services/NotificationsService";

function CompanyDetails(): JSX.Element {
    const [company,setCompany]=useState<Company>();
    const id:number=+useParams().companyId;
    useEffect(()=>{
        adminService.getOneCompany(id)
        .then(c=>setCompany(c))
        .catch(error=>notificationsService.error(error))
    },[])
    return (
        <div className="CompanyDetails">
			<h1>{company?.name}</h1>
            <h2>{company?.email}</h2>
            
        </div>
    );
}

export default CompanyDetails;
