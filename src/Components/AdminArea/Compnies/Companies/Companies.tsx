import { useEffect, useState } from "react";
import Company from "../../../../Models/Company";
import "./Companies.css";
import adminService from "../../../../Services/AdminService";
import { error } from "console";
import notificationsService from "../../../../Services/NotificationsService";
import CompanyCard from "../CompanyCard/CompanyCard";
import { companiessStore } from "../../../../store/CompaniesState";

function Companies(): JSX.Element {
    const [getCompanies,setCompanies]=useState<Company[]>([]);
    useEffect(()=>{
      
        adminService.getAllCompanies()
        .then(( Companies)=>{
            setCompanies(Companies)
        })
        .catch(error=>notificationsService.error("You not loged in"))
    },[]);
    return (
        <div className="Companies">
           
			{getCompanies.length>0 &&<>
                <h1>You have {getCompanies.length} companies it's wow <br /> but --- today you will multiply  it!!!</h1>
                {getCompanies.map(c=><CompanyCard key={c.id}company={c}/>)}
                </>
              }
             {getCompanies.length==0&&
             <h1>There are no companies 🙄</h1>}
            
        </div>
    );
}

export default Companies;
