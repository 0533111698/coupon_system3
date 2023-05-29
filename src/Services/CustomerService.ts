import axios from "axios";
import Coupon from "../Models/Coupon";
import { addCoup, couponsStore, deleteCoupon, deletePurchseCoupon, featchAllCoupons, featchCoupons } from "../store/CouponsState";
import { createTypeReferenceDirectiveResolutionCache } from "typescript";

class CustomerService {
public async getAllCoupons(){
    if(couponsStore.getState().allCoupons.length===0){
    const response=(await axios.get<Coupon[]>('http://localhost:8080/customer/getAll')).data;
    couponsStore.dispatch(featchAllCoupons(response));
    return (response);
    }
    return couponsStore.getState().allCoupons;
}
public async purchaseCoupon(coupon:Coupon){
    const response=(await axios.post<Coupon> ('http://localhost:8080/customer/purchaseCoupon',coupon)).data;
    couponsStore.dispatch(addCoup(coupon));
    return response;

}
public async getCustomerCoupons(){
    if(couponsStore.getState().coupons.length===0){
    const response=(await axios.get<Coupon[]>('http://localhost:8080/customer/getCustomerCoupons')).data;
    couponsStore.dispatch(featchCoupons(response));
    return response;
    
    }
    return couponsStore.getState().coupons
}
public async deletePurchaseCoupon(coupon:Coupon){
    const response=(await axios.post('http://localhost:8080/customer/deletePurchaseCoupon',coupon)).data
    couponsStore.dispatch(deletePurchseCoupon(coupon));
    return response;

}
}

const customerService=new CustomerService
export default customerService;
