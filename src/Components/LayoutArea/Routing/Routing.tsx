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
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import Coupons from "../../CompanyArea/Coupons/Coupons";
import CouponDetails from "../../CompanyArea/CouponDetails/CouponDetails";
import AllCoupons from "../../CustomerArea/AllCoupons/AllCoupons";

import CouponPurchase from "../../CustomerArea/CouponPurchase/CouponPurchase";
import CustomerCoupons from "../../CustomerArea/CustomerCoupons/CustomerCoupons";
import CouponList from "../../CustomerArea/CouponList/CouponList";
import Blog from "../../PagesArea/Blog/Blog";
import CompanyDetailsUseComp from "../../CompanyArea/Company/CompanyDetailsUseComp";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                
                <Route path="/" element={<AllCoupons/>}></Route>
                
                <Route path="/customers/:customerId" element={<CustomerDetails/>}/>
                <Route path="/companies/edit/:compId" element={<UpdateCompany />} />
                <Route path="/customers/edit/:custId" element={<UpdateCustomer />} />                
                <Route path="/company/:companyId" element={<CompanyDetails/>}/>
                <Route path="/coupons/:couponId" element={<CouponDetails/>}/>
                <Route path="/customers" element={<Customers/>}/>
                <Route path="/companies" element={<Companies/>}/>
                <Route path="/coupons" element={<Coupons/>}/>
                <Route path="/Company/add"element={<AddCompany/>}/>
                <Route path="/companyDetails"element={<CompanyDetailsUseComp/>}/>
                <Route path="/customer/add"element={<AddCustomer/>}/>
                <Route path="/coupon/add"element={<AddCoupon/>}/>
                <Route path="/customer/purchase/:couponId" element={<CouponPurchase/>}></Route>
                <Route path="/customer/couponList" element={<CouponList/>}></Route>
                <Route path="/customer/coupons" element={<CustomerCoupons/>}></Route>
                <Route path="/blog" element={<Blog/>}></Route>

                <Route path="/login" element={<Login/>}></Route>
                <Route path="*" element={<PageNotFound/>}></Route>
            
                </Routes>	
        </div>
    );
}

export default Routing;
