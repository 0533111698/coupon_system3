import { NavLink, useNavigate, useParams } from "react-router-dom";
import Company from "../../../../Models/Company";
import "./CompanyCard.css";
import adminService from "../../../../Services/AdminService";
import notificationsService from "../../../../Services/NotificationsService";
import { useEffect, useState } from "react";
import { companiessStore } from "../../../../store/CompaniesState";
interface CompanyProps{
    company:Company
}


function CompanyCard(props:CompanyProps): JSX.Element {   
    const navigate = useNavigate();
    const [companies, setCompanies]=useState<Company[]>();
    const id: number = +useParams().compId;
    
   
    function deleteMe(){
        adminService.deleteCompany(props.company.id)
        .then(()=>{
            notificationsService.succes("deleted succes");
            window.location.reload();
            navigate("/companies");
        })
        .catch(err=>notificationsService.error(err.message));
    }
    function updateMe(){
        navigate("/companies/edit/" + props.company.id);
    }
    return (
        <div className="CompanyCard">
		<NavLink to={"/company/"+props.company.id}>
            <h4>{props.company.name}</h4></NavLink>	
            <p>{props.company.email}</p>
            <button onClick={deleteMe}>🗑</button>
            <button onClick={updateMe}>✏</button>
            
        </div>
    );
}

export default CompanyCard;
