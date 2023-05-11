import axios from "axios";
import User from "../Models/User";
import { authStore, loginAction, logout } from "../store/AouthSttate";
import Credentials from "../Models/Credentials";


class AuthService {

	public async login(credentials:Credentials){
        const token = (await axios.post<string>("http://localhost:8080/auth/login", credentials)).data; 
        authStore.dispatch(loginAction(token));
        return token;
    }
    public async logout(){
        authStore.dispatch(logout());
    }
}

const authService = new AuthService();
export default authService;
