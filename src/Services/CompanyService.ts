import axios from "axios";
import { companiessStore } from "../store/CompaniesState";
import { addCoup, couponsStore, deleteCoupon, featchCoupons, updateCoupon } from "../store/couponsState";
import Coupon from "../Models/Coupon";

class CompanyService {
    
    public async getAllCompanyCoupons(){
        if(couponsStore.getState().coupons.length==0){
        const response=await axios.get<Coupon[]>('http://localhost:8080/company/getAllCompanyCoup');
        couponsStore.dispatch(featchCoupons(response.data))    
        return response.data;
        }
        return couponsStore.getState().coupons;
    }
    public async addCoupon(coupon:Coupon){
        const response=((await axios.post<Coupon>('http://localhost:8080/company/addCoupon',coupon)).data);
        couponsStore.dispatch(addCoup(response));
        return response;

    } 
    public async updateCoupon(coupon:Coupon){
        const response=((await axios.put<Coupon>('http://localhost:8080/company/updateCoupon',coupon)).data);
        couponsStore.dispatch(updateCoupon(response));
        return response;

    } 
    public async deleteCoupon(couponId:number){
        const response=(await axios.delete("http://localhost:8080/company/"+couponId)).data;
        couponsStore.dispatch((deleteCoupon(couponId)));
        return response;
    }
}
const companyService=new CompanyService
export default companyService;
