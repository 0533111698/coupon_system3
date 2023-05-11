import jwtDecode from "jwt-decode";
import User from "../Models/User";
import { createStore } from "redux";
import Credentials from "../Models/Credentials";

export class AuthState{
    public token :string=null;
    public user :User =null;
    public cred:Credentials

    constructor(){
        if(localStorage.token){
            this.token = localStorage.token;
            const container: { user: User} = jwtDecode(this.token);
            this.user = container.user;
        }
    }
}
export enum AutActionsTypes{
    Register, Login, Logout
}
export interface AuthAction{
    type:AutActionsTypes;
        payload?: string
    }
    export function registerAction(token:string){
        return{type:AutActionsTypes.Register,payload:token}
    }
    export function loginAction(token:string){
        return{type:AutActionsTypes.Login,payload:token}
    }
    export function loguotAction(){
        return{type:AutActionsTypes.Logout}
    }
    export function authReducer(currentState=new AuthState(),action:AuthAction){
        const newState={...currentState};
        switch(action.type){
            case AutActionsTypes.Login:
                const token=action.payload;
                newState.token=token;
                const container:{cred:Credentials}=jwtDecode(token);
                newState.cred=container.cred;
                localStorage.token=token;
            break;
            case AutActionsTypes.Logout:
                newState.token=null;
                newState.user=null;
                localStorage.removeItem("token");
            break;
        
        }  
        return newState;
    
    }
    export const authStore=createStore(authReducer);
 