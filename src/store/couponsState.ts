import { createStore } from "redux";
import Coupon from "../Models/Coupon";

// 1. the state - array of Coupons
export class AdminCouponsState{
    public coupons: Coupon[]=[];
    public allCoupons: Coupon[]=[];
    
}
// 2. a list of Action Types
export enum CouponsActionTypes{
    FeatchCoupons, AddCoupon, DeleteCoupon,UpdateCoupon,FeatchAllCoupons
    ,AddToAllCoupons,DeleteFromAllCoupons,DeletePurchseCoupon,Logout
}
// 3. wrapper for Action and Value
export interface CouponsAction{
    type:CouponsActionTypes,
    payload?:any
}
// 4. helper functions to create above interface instances
export function featchCoupons(coupons:Coupon[]){
    return{type:CouponsActionTypes.FeatchCoupons,payload:coupons}
}
export function featchAllCoupons(allCoupons:Coupon[]){
    return{type:CouponsActionTypes.FeatchAllCoupons,payload:allCoupons}
}
export function addCoup(coupon:Coupon){
    return{type:CouponsActionTypes.AddCoupon,payload:coupon}
}
export function updateCoupon(coupon:Coupon){
    return{type:CouponsActionTypes.UpdateCoupon,payload:coupon}
}
export function deleteCoupon(couponId:number){
    return {type:CouponsActionTypes.DeleteCoupon,payload:couponId}
}
export function deletePurchseCoupon(coupon:Coupon){
    return {type:CouponsActionTypes.DeletePurchseCoupon,payload:coupon}
}
export function logoutCoupons(){
    return {type:CouponsActionTypes.Logout}
}
// 5. Reducer - the logic for each Action
function couponReducer(currentState=new AdminCouponsState(),action:CouponsAction){
    const newState={...currentState};// copy the state to a new instance
    switch(action.type){
        case CouponsActionTypes.FeatchCoupons:
            newState.coupons=action.payload;
            break;
        case CouponsActionTypes.FeatchAllCoupons:
            newState.allCoupons=action.payload;
            break;
        case CouponsActionTypes.AddCoupon:
            newState.coupons.push(action.payload);
            newState.allCoupons.push(action.payload);
            break;
        case CouponsActionTypes.UpdateCoupon:
            const coupId=action.payload.id;
            const coupIndex=newState.coupons.findIndex(c=>c.id==coupId);
            const allCoupIndex=newState.allCoupons.findIndex(c=>c.id==coupId);
            if(coupIndex>=0)
                    newState.coupons[coupIndex]=action.payload;
            if(allCoupIndex>=0)
                    newState.allCoupons[allCoupIndex]=action.payload
            break;
        case CouponsActionTypes.DeleteCoupon:
            const id=action.payload; // payload is number
            const index=newState.coupons.findIndex(c=>c.id==id);
            const index2=newState.coupons.findIndex(c=>c.id==id);
            if (index>=0)
                    newState.coupons.splice(index,1);
            if(index2>=0)
                    newState.allCoupons.splice(index,1);

            break;
        case CouponsActionTypes.DeletePurchseCoupon:
            const idd=action.payload.id; 
            const indexx=newState.coupons.findIndex(c=>c.id==idd);
            if (indexx>=0)
                 newState.coupons.splice(indexx,1);
            break;
        case CouponsActionTypes.Logout:
            newState.allCoupons=[];
            newState.coupons=[];
            break;
        
    }
    return newState;
}
export const couponsStore = createStore(couponReducer); 