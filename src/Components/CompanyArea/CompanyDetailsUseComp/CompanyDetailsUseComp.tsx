import { useEffect, useState } from "react";
import companyService from "../../../Services/CompanyService";
import "./CompanyDetailsUseComp.css";
import Company from "../../../Models/Company";
import notificationsService from "../../../Services/NotificationsService";
import { useNavigate } from "react-router-dom";
import { CardGiftcard } from "@mui/icons-material";
import { Button } from "@mui/material";



function CompanyDetailsUseComp(): JSX.Element {
    const[company,setCompany]=useState<Company>();
    const navigate=useNavigate();
useEffect(()=>{
    companyService.getCompanyDetails()
    .then((comp)=>setCompany(comp))
    .catch(err=>notificationsService.error(err))
})
function getCompanyCoupons(){
    navigate("/coupons");
}
    return (
        <div className="Company">
		<h1>{company?.name}</h1>
        <h2>{company?.email}</h2>
        <Button onClick={getCompanyCoupons}><CardGiftcard fontSize="large"/>Get Your Coupons</Button>
        </div>
    );
}

export default CompanyDetailsUseComp;
