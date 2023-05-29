import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "./Logo.jpg"

import AuthMenu from "../../AouthArea/AuthMenu/AuthMenu";


function Header(): JSX.Element {
    return (
        <div className="Header">
            <img src={logo} alt="" />
      
                <menu>
             <AuthMenu/>
             </menu>
            
          
      
        </div>
    );
}

export default Header;
