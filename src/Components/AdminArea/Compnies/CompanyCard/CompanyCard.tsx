import { NavLink } from "react-router-dom";
import Company from "../../../../Models/Company";
import "./CompanyCard.css";
interface CompanyProps{
    company:Company
}

function CompanyCard(props:CompanyProps): JSX.Element {
    return (
        <div className="CompanyCard">
		<NavLink to={"/company/"+props.company.id}>
            <h4>{props.company.name}</h4></NavLink>	
            <p>{props.company.email}</p>
        </div>
    );
}

export default CompanyCard;
