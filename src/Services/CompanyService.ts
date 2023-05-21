import axios from "axios";
import { companiessStore } from "../store/CompaniesState";
import { addCoup, couponsStore, deleteCoupon, featchCoupons, updateCoupon } from "../store/CouponsState";
import Coupon from "../Models/Coupon";
import Company from "../Models/Company";

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
        // const formData = new FormData();
        // formData.append("category", coupon.category.toString());
        // formData.append("title", coupon.title);
        // formData.append("description", coupon.description);
        // formData.append("startDate", coupon.startDate.toString());
        // formData.append("endDate", coupon.endDate.toString());
        // formData.append("amount", coupon.amount.toString());
        // formData.append("image", coupon.image);
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
    public async getCompanyDetails(){
        const response=(await axios.get<Company>("http://localhost:8080/company/getCompanyDetails")).data;
        return response;
    }
    public async getOneCoupon(couponId:number):Promise <Coupon>{
        const coup=couponsStore.getState().coupons.find(c=>c.id==couponId);
        if(coup==undefined){
                throw Error("coupon not found!");
    }
        else
                return coup;        
    }
}
const companyService=new CompanyService
export default companyService;
