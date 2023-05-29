import axios from "axios";
import User from "../Models/User";

import Credentials from "../Models/Credentials";
import { authStore, loginAction, logout } from "../store/AouthState";
import { companiessStore, logoutCompanies } from "../store/CompaniesState";
import { couponsStore, logoutCoupons } from "../store/CouponsState";
import { customersStore, logoutCustomers } from "../store/CustomersStore";


class AuthService {

	public async login(credentials:Credentials){
        const token = (await axios.post<string>("http://localhost:8080/auth/login", credentials)).data; 
        authStore.dispatch(loginAction(token));
        return token;
    }
    public async logout(){
        const tokn=authStore.getState().token;
        const response= (await axios.post<string>("http://localhost:8080/auth/logout/"+tokn)).data;
        authStore.dispatch(logout());
        companiessStore.dispatch(logoutCompanies());
        customersStore.dispatch(logoutCustomers())
        couponsStore.dispatch(logoutCoupons())
        return response;    
    }
}

const authService = new AuthService();
export default authService;
