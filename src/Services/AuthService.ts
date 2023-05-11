import axios from "axios";
import User from "../Models/User";
import { authStore, loginAction, loguotAction, registerAction, } from "../store/AouthSttate";
import Credentials from "../Models/Credentials";


class AuthService {
    public async register(user: User){
        const token = (await axios.post<string>("http://localhost:3030/api/auth/register", user)).data;      
        authStore.dispatch(registerAction(token));
    }
	public async login(credentials:Credentials){
        const token = (await axios.post<string>("http://localhost:8080/auth/login", credentials)).data; 
        authStore.dispatch(loginAction(token));
        //return token;
    }
    public async logout(){
        authStore.dispatch(loguotAction());
    }
}

const authService = new AuthService();
export default authService;
