import { useForm } from "react-hook-form";
import "./Register.css";
import User from "../../../Models/User";
import AuthService from "../../../Services/AuthService";
import authService from "../../../Services/AuthService";
import notificationsService from "../../../Services/NotificationsService";

function Register(): JSX.Element {
    const{register, handleSubmit}=useForm<User>();
    function send(user :User){
        authService.register(user).then(
            ()=>{notificationsService.succes("Wellcome" +user.name+"to our Ginger Couopns ")}
        ).catch(err=>notificationsService.error(err))
    }
    return (
        <div className="Register">
			<h1>Lets be register as a new user 💗</h1>
            <form onSubmit={handleSubmit(send)}>
            <input type="text"placeholder="Israel Israeli"{...register("name")} /><br/>
            <input type="email"placeholder="israel@123456"{...register("email")} /><br/>
            <input type="password"placeholder="Ii%1234" {...register("password")}/><br/>
            <input type="submit" value={"i want to be in... "} />
            </form>
        </div>
    );
}

export default Register;
