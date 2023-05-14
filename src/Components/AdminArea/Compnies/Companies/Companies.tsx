import { useEffect, useState } from "react";
import Company from "../../../../Models/Company";
import "./Companies.css";
import adminService from "../../../../Services/AdminService";
import { error } from "console";
import notificationsService from "../../../../Services/NotificationsService";
import CompanyCard from "../CompanyCard/CompanyCard";

function Companies(): JSX.Element {
    const [getCompanies,setCompanies]=useState<Company[]>([]);
    useEffect(()=>{
        adminService.getAllCompanies()
        .then(( Companies)=>{
            setCompanies(Companies)
        })
        .catch(error=>notificationsService.error("You are not loged in"))
    },[]);
    return (
        <div className="Companies">
			{getCompanies.map(c=><CompanyCard key={c.id}company={c}/>)}
        </div>
    );
}

export default Companies;
