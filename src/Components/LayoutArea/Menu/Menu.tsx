import { NavLink } from "react-router-dom";
import "./Menu.css";
import AuthMenu from "../../AouthArea/AuthMenu/AuthMenu";
import { useEffect, useState } from "react";
import ClientType from "../../../Models/ClientType";
import { authStore } from "../../../store/AouthState";
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCardIcon from '@mui/icons-material/AddCard';
import DvrIcon from '@mui/icons-material/Dvr';
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
                <NavLink to="/customers"><PeopleIcon fontSize="large"/>All customers</NavLink>   <span>        </span>
            <NavLink to="/companies"><GroupWorkIcon fontSize="large"/>All companies</NavLink><span>        </span>
            <NavLink to="/company/add"><AddCircleIcon fontSize="large"/>addCompany</NavLink><span>        </span>
            <NavLink to="/customer/add"><PersonAddAlt1Icon fontSize="large"/>addCustomer</NavLink><span>        </span>
            
                </>

            }
            { clientType==="Company"&&<>
            <NavLink to="/coupon/add"><AddCardIcon fontSize="large"/>addCoupon</NavLink><span>        </span>
            <NavLink to="/coupons"><CardGiftcard fontSize="large"/>MyCoupons</NavLink><span>  </span>   
            <NavLink to="/companyDetails"><DvrIcon fontSize="large"/>My company details</NavLink>
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
