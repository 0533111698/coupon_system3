import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class NotificationsService{
    public succes(massage:string){
     toast.success(massage);   
    }
    public error(massage:string){
        toast.error(massage);

    }

}
const notificationsService= new NotificationsService
export default notificationsService;