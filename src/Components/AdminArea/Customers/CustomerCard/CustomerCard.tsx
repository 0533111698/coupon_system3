import { NavLink, useNavigate, useParams } from "react-router-dom";
import Customer from "../../../../Models/Customer";
import "./CustomerCard.css";
import adminService from "../../../../Services/AdminService";
import notificationsService from "../../../../Services/NotificationsService";
interface CustomerProps{
    customer:Customer
}

function CustomerCard(props:CustomerProps): JSX.Element {
    const navigate=useNavigate();


  
    return (
        <div className="CustomerCard">
            <NavLink to={"/customers/"+props.customer.id}>
            <h4>{props.customer.firstName} {props.customer.lastName}</h4>
            </NavLink>
            <p>email:{props.customer.email}</p>	

           		
        </div>
    );
}

export default CustomerCard;
