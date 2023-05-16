import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import CustomerDetails from "../../AdminArea/Customers/CustomerDetails/CustomerDetails";
import CustomerCard from "../../AdminArea/Customers/CustomerCard/CustomerCard";
import Customers from "../../AdminArea/Customers/Customers/Customers";
import Login from "../../AouthArea/Login/Login";
import AddCompany from "../../AdminArea/Compnies/AddCompany/AddCompany";
import PageNotFound from "../../PagesArea/PageNotFound/PageNotFound";
import Companies from "../../AdminArea/Compnies/Companies/Companies";
import CompanyDetails from "../../AdminArea/Compnies/CompanyDetails/CompanyDetails";
import AddCustomer from "../../AdminArea/Customers/AddCustomer/AddCustomer";
import UpdateCompany from "../../AdminArea/Compnies/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../AdminArea/Customers/UpdateCustomer/UpdateCustomer";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/customers/:customerId" element={<CustomerDetails/>}/>
                <Route path="/companies/edit/:compId" element={<UpdateCompany />} />
                <Route path="/customers/edit/:custId" element={<UpdateCustomer />} />                
                <Route path="/company/:companyId" element={<CompanyDetails/>}/>
                <Route path="/customers" element={<Customers/>}/>
                <Route path="/companies" element={<Companies/>}/>
                <Route path="/Company/add"element={<AddCompany/>}/>
                <Route path="/customer/add"element={<AddCustomer/>}/>
                <Route path="*" element={<PageNotFound/>}></Route>
            
                </Routes>	
        </div>
    );
}

export default Routing;
