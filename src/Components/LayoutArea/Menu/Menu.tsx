import { NavLink } from "react-router-dom";
import "./Menu.css";
import AuthMenu from "../../AouthArea/AuthMenu/AuthMenu";
import { useEffect, useState } from "react";
import ClientType from "../../../Models/ClientType";
import { authStore } from "../../../store/AouthState";
import HomeIcon from '@mui/icons-material/Home';


import { CardGiftcard, ShoppingCart,FreeBreakfast } from "@mui/icons-material";



function Menu(): JSX.Element {
    const [clientType,setClientType]=useState<string>();
  

    useEffect(()=>{
        setClientType(authStore.getState().clientType)
        const unsubscribe=authStore.subscribe(()=>{
            setClientType(authStore.getState().clientType)
        })
        return ()=>{
            unsubscribe();
        }

    },[])
    return (
        <div className="Menu">
            
               
                <NavLink to="/"> <HomeIcon fontSize="large"/> Home</NavLink><span>|</span> 
                <NavLink to="/blog"><FreeBreakfast fontSize="large"/> Blog</NavLink><span> </span> 

        
            {
                clientType==="Administrator"&&<>
                <NavLink to="/customers">Customers</NavLink>   <span>        </span>
            <NavLink to="/companies">Companies</NavLink><span>        </span>
            <NavLink to="/company/add">addCompany</NavLink><span>        </span>
            <NavLink to="/customer/add">addCustomer</NavLink><span>        </span>
            
                </>

            }
            { clientType==="Company"&&<>
            <NavLink to="/coupon/add">addCoupon</NavLink><span>        </span>
            <NavLink to="/coupons">jgk</NavLink><span>  </span>   
            <NavLink to="/companyDetails">Get your company details</NavLink>
            </>}
            {clientType==="Customer"&&<>
            <NavLink to="/customer/coupons"><ShoppingCart fontSize="large"/> My coupons</NavLink><span>        </span>
            <NavLink to="/customer/couponList"><CardGiftcard fontSize="large"/>All coupons</NavLink>
            </>

            }
           

           
           
        </div>
    );
}

export default Menu;
