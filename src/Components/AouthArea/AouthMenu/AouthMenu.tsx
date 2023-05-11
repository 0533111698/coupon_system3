import { NavLink, useNavigate } from "react-router-dom";
import "./AouthMenu.css";
import { useEffect, useState } from "react";
import { authStore } from "../../../store/AouthSttate";
import authService from "../../../Services/AuthService";

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
                navigate("/login");
            }
        ).catch();
    }
    return (
        <div className="AouthMenu">
			   !token && 
                <>
                    <NavLink to={"/login"}>Login</NavLink>
                </> ||
                <>
                    Hello {authStore.getState().name} <button onClick={logout}>Logout</button>
                </>
        </div>
    );
}

export default AouthMenu;
