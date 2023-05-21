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


       // adminService.del(props.company.id)
     //   .then(()=>{
      //      notificationsService.succes("deleted succes");
      //      window.location.reload();
     //       navigate("/companies");
      //  })
    //    .catch(err=>notificationsService.error(err.message));
   // }
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
