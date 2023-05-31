import { wait } from '@testing-library/user-event/dist/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authStore, logout } from '../store/AouthState';
import { companiessStore, logoutCompanies } from '../store/CompaniesState';
import { couponsStore, logoutCoupons } from '../store/CouponsState';
import { customersStore, logoutCustomers } from '../store/CustomersStore';
import { useNavigate } from 'react-router-dom';


class NotificationsService{
  
    
    public success(msg:string){
        toast.success(msg)
    }
    public error(err:any){
        if(typeof err == "string"){                           
            toast.error(err);
            } else if(err.response?.data){ 
            toast.error(err.response.data);
            wait(3000)
                if (err.response.status === 401){
                        
                    //localStorage.removeItem('token');
                    // authStore.dispatch(logout());
                    // companiessStore.dispatch(logoutCompanies());
                    // customersStore.dispatch(logoutCustomers())
                    // couponsStore.dispatch(logoutCoupons())
                    
                    
                    
                
            }} else {                                          
            toast.error(err.message);
        }        
        
    }

}
const notificationsService= new NotificationsService
export default notificationsService;