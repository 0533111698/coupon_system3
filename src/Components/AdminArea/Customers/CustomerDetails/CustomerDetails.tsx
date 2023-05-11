import { useEffect, useState } from "react";
import "./CustomerDetails.css";
import Company from "../../../../Models/Company";
import { useNavigate, useParams } from "react-router-dom";
import adminService from "../../../../Services/AdminService";
import Customer from "../../../../Models/Customer";
import customerService from "../../../../Services/CustomerService";
import { error } from "console";
import notificationsService from "../../../../Services/NotificationsService";

function CustomerDetails(): JSX.Element {
    const[show,setShow]=useState(false);
    const[customer, setCustomer]=useState<Customer>();
    const id:number =+useParams().customerId;
    const navigate=useNavigate();
    useEffect( ()=>{
    adminService.getOneCustomer(id)
    .then(c=>setCustomer(c))
    .catch(error=>notificationsService.error(error))
    } ,[]);
    


    return (
        <div className="CustomerDetails">
			{!customer&&<p>"the customer lost..."</p>}
            {customer&&<><h1>{customer?.firstName}{customer?.lastName}</h1>
            <h2>{customer.email}</h2>
            </>}
        </div>
    );
}

export default CustomerDetails;
