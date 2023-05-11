import { createStore } from "redux";
import Coupon from "../Models/Coupon";

// 1. the state - array of Coupons
export class AdminCouponsState{
    public coupons: Coupon[]=[];
}
// 2. a list of Action Types
export enum CouponsActionTypes{
    FeatchCoupons, AddCoupon, DeleteCoupon,UpdateCoupon
}
// 3. wrapper for Action and Value
export interface CouponsAction{
    type:CouponsActionTypes,
    payload:any
}
// 4. helper functions to create above interface instances
export function featchCoupons(coupons:Coupon[]){
    return{type:CouponsActionTypes.FeatchCoupons,payload:coupons}
}
export function addCoup(coupon:Coupon){
    return{type:CouponsActionTypes.AddCoupon,payload:coupon}
}
export function updateCoupon(coupon:Coupon){
    return{type:CouponsActionTypes.UpdateCoupon,payload:coupon}
}
export function deleteCoupon(id:number){
    return {type:CouponsActionTypes.DeleteCoupon,payload:id}
}
// 5. Reducer - the logic for each Action
function couponReducer(currentState=new AdminCouponsState(),action:CouponsAction){
    const newState={...currentState};// copy the state to a new instance
    switch(action.type){
        case CouponsActionTypes.FeatchCoupons:
            newState.coupons=action.payload;
            break;
        case CouponsActionTypes.AddCoupon:
            newState.coupons.push(action.payload);
            break;
        case CouponsActionTypes.UpdateCoupon:
            const coupId=action.payload.id;
            const coupIndex=newState.coupons.findIndex(c=>c.id==coupId);
            if(coupIndex>=0)
                    newState.coupons[coupIndex]=action.payload;
            break;
        case CouponsActionTypes.DeleteCoupon:
            const id=action.payload; // payload is number
            const index=newState.coupons.findIndex(c=>c.id==id);
            if (index>=0)
                    newState.coupons.splice(index,1);
            break;
        
    }
    return newState;
}
export const couponsStore = createStore(couponReducer); 