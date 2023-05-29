import { NavLink, useNavigate } from "react-router-dom";
import "./AouthMenu.css";
import { useEffect, useState } from "react";

import authService from "../../../Services/AuthService";
import { authStore } from "../../../store/AouthState";
import { error } from "console";
import notificationsService from "../../../Services/NotificationsService";
import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";

function AouthMenu(): JSX.Element {
    const navigate = useNavigate();
    const [token, setToken] = useState<string>();
    useEffect(()=>{
        setToken(authStore.getState().token);
        const unsubscribe = authStore.subscribe(()=>{
            setToken(authStore.getState().token);
        })

        return ()=>{
            unsubscribe();
        }
    }, []);

    function logout(){
        authService.logout().then(
            ()=>{
                notificationsService.success(" good bye" )
                
                navigate("/login");
               
            }
        ).catch(error=>notificationsService.error(error));
    }
    function login(){
        navigate("/login")
    }
   
    return (
        <div className="AouthMenu">
			   {!token && 
                <>
                <button onClick={login }>Login</button>
                   
                </> }
                {token&&
                <>
                    <span>Hello {authStore.getState().name}!</span>
                     <Button onClick={logout}variant="text" startIcon={<Logout />}>
                                    Logout
                     </Button>
                </>
}
        </div>
    );
}

export default AouthMenu;
