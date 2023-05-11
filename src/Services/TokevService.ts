import axios from "axios";
import { authStore } from "../store/AouthSttate";


export function tokenInterceptor(){
    axios.interceptors.request.use( (config)=>{
        if(authStore.getState().token){
            config.headers.Authorization = "Bearer " + authStore.getState().token
        }

        return config;
    })
}