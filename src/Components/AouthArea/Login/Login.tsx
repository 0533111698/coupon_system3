import { useForm } from "react-hook-form";
import "./Login.css";

import { NavLink, useNavigate } from "react-router-dom";
import LoginService from "../../../Services/AuthService";
import { log } from "console";
import wellcome from "./wellcomeImage2.jpg";
import Credentials from "../../../Models/Credentials";
import notificationsService from "../../../Services/NotificationsService";


function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<Credentials>();
    const navigate = useNavigate();

    function send(credentials: Credentials) {
        LoginService.login(credentials).then(()=>{
            notificationsService.succes("Wellcome!!!")
            navigate("/customers");
        }).catch((error)=> {
            notificationsService.error("hoops");
        });
    }
    return (
        <div className="Login">
            <h1>Wellcome to the reddish and hot coupons 🔥🔥🔥</h1>
            <div>
            <form onSubmit={handleSubmit(send)}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="a123456@gmail.com" {...register("email", {
                    required: { value: true, message: "email is required" },
                })} />
                <br />
                <span>{}</span>
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="B1234@"  {...register("password")} />
                <select id="clientType"  {...register("clientType", {
                    required: { value: true, message: "clientType is required" }
                })}>
                    <option value="Administrator">Administrator</option>
                    <option value="Company">Company</option>
                    <option value="Customer">Customer</option>
                </select>
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
