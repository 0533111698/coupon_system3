import { useNavigate } from "react-router-dom";
import "./AddCustomer.css";
import Customer from "../../../../Models/Customer";
import { useForm } from "react-hook-form";
import adminService from "../../../../Services/AdminService";
import notificationsService from "../../../../Services/NotificationsService";
import { mainModule } from "process";

function AddCustomer(): JSX.Element {
    const {register, handleSubmit,formState}=useForm<Customer>();
    const navigate=useNavigate();
    function sendCustomer(customer:Customer){
       adminService.addCustomer(customer)
       .then(newcust=>{
        notificationsService.succes("customer added!");
        navigate("/customer/"+newcust.id)
       } )
       .catch(err=>{
        notificationsService.error(err);
       })
    }
       
    return (
        <div className="AddCustomer">
						<form onSubmit={handleSubmit(sendCustomer)}>
                <h1>Add new Customer</h1>
                <input type="text"placeholder="Enter first name here"{...register("firstName",{
                    required:{value:true,message:"Required field"}
                })} /><br/>
                <span>{formState.errors?.firstName?.message}</span><br />
                <input type="text"placeholder="Enter last name here"{...register("lastName",{
                    required:{value:true,message:"Required field"},minLength:{value:2,message:""}
                })} /><br/>
                <span>{formState.errors?.lastName?.message}</span><br />
                <input type="text" placeholder="Enter email here"{...register("email",{
                    required:{value:true,message:"Required field"}
                })} /> <br />
                <span>{formState.errors?.email?.message}</span><br />
                <input type="text" placeholder="Enter password here"{...register("password",{
                    required:{value:true,message:"Required field"}
                })} /><br/>
                <span>{formState.errors?.password?.message}</span><br />
                <button name="add" type="submit">Add Customer</button>
                </form>
        </div>
    );
}

export default AddCustomer;
