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

    return (
        <div className="CompanyCard">
		<NavLink to={"/company/"+props.company.id}>
            <h4>{props.company.name}</h4></NavLink>	
            <p>{props.company.email}</p>
            
            
        </div>
    );
}

export default CompanyCard;
