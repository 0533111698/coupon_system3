import { NavLink, useNavigate, useParams } from "react-router-dom";
import Customer from "../../../../Models/Customer";
import "./CustomerCard.css";
interface CustomerProps{
    customer:Customer
}

function CustomerCard(props:CustomerProps): JSX.Element {
    const navigate=useNavigate();
    function updateMe(){
     navigate("/customers/edit/"+props.customer.id);
    }
    return (
        <div className="CustomerCard">
            <NavLink to={"/customers/"+props.customer.id}>
            <h4>{props.customer.firstName} {props.customer.lastName}</h4>
            </NavLink>
            <p>email:{props.customer.email}</p>	
            <button onClick={updateMe}>✏</button>
           		
        </div>
    );
}

export default CustomerCard;
