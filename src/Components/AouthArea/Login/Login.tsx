import { useForm } from "react-hook-form";
import "./Login.css";

import { NavLink, useNavigate } from "react-router-dom";
import LoginService from "../../../Services/AuthService";
import { log } from "console";
import wellcome from "./wellcomeImage2.jpg";
import Credentials from "../../../Models/Credentials";
import notificationsService from "../../../Services/NotificationsService";
import { companiessStore } from "../../../store/CompaniesState";
import { authStore } from "../../../store/AouthState";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<Credentials>();
    const navigate = useNavigate();

    function send(credentials: Credentials) {
        LoginService.login(credentials).then(()=>{
            notificationsService.success("Wellcome  " +authStore.getState().name+"!!!");
            navigate("/");
        }).catch((error)=> {
            notificationsService.error(error);
        });
    }
 
    return (
        <div className="Login">
            <h1>Wellcome to the reddish and hot coupons 🔥🔥🔥</h1>
            <div>
            <form onSubmit={handleSubmit(send)}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="email" {...register("email", {
                    required: { value: true, message: "You must enter your email"},

                    
                })} />
                <br />
                <span>{formState.errors?.email?.message}</span><br/>
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="password"  {...register("password",{
                    required:{value:true, message:"You must enter your password"}
                })} />
                <span>{formState.errors?.password?.message}</span>
                <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Role:</InputLabel>
  <Select {...register("clientType", {
                })}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
   
    label="Role"
    
  >
    <MenuItem value="Administrator">Administrator</MenuItem>
    <MenuItem  value="Company">Company</MenuItem>
    <MenuItem value="Customer">Customer</MenuItem>
  </Select>
</FormControl>
                
                {/* <select id="clientType" defaultValue={"Customer"} {...register("clientType", {
                })}>
                    <option value="Administrator">Administrator</option>
                    <option value="Company">Company</option>
                    <option value="Customer">Customer</option>
                </select> */}
                <br />

                <span>{}</span>
                <br />

                <button name="login" type="submit">Login</button>

            </form>
            </div>
            
           
        </div>

    );
}

export default Login;
