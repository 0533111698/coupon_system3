import { useEffect, useState } from "react";
import Customer from "../../../../Models/Customer";
import "./Customers.css";
import AdminService from "../../../../Services/AdminService";
import { error } from "console";
import CustomerCard from "../CustomerCard/CustomerCard";
import adminService from "../../../../Services/AdminService";

function Customers(): JSX.Element {
    const[getCustomers,setCustomers]=useState<Customer[]>([]);
    useEffect(()=>{
        
        adminService.getAllCustomers()
        .then((Customers)=>{
            setCustomers(Customers)
        })
        .catch(error=>alert(error))
    },[]);
    return (
        <div className="Customers">
			{getCustomers.map(c=><CustomerCard key={c.id} customer={c}/>)}
        </div>
    );
}

export default Customers;
