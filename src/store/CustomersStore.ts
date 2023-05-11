import { createStore } from "redux";
import Customer from "../Models/Customer";

// 1. the state - array of Customers
export class AdminCustomersState{
    public customers: Customer[]=[];
}
// 2. a list of Action Types
export enum CustomersActionTypes{
    FeatchCustomers, AddCustomer, DeleteCustomer,UpdateCustomer
}
// 3. wrapper for Action and Value
export interface CustomersAction{
    type:CustomersActionTypes,
    payload:any
}
// 4. helper functions to create above interface instances
export function featchCustomers(customers:Customer[]){
    return{type:CustomersActionTypes.FeatchCustomers,payload:customers}
}
export function addCus(customer:Customer){
    return{type:CustomersActionTypes.AddCustomer,payload:customer}
}
export function updateCustomer(customer:Customer){
    return{type:CustomersActionTypes.UpdateCustomer,payload:customer}
}
export function deleteCustomer(id:number){
    return {type:CustomersActionTypes.DeleteCustomer,payload:id}
}
// 5. Reducer - the logic for each Action
function customerReducer(currentState=new AdminCustomersState(),action:CustomersAction){
    const newState={...currentState};// copy the state to a new instance
    switch(action.type){
        case CustomersActionTypes.FeatchCustomers:
            newState.customers=action.payload;
            break;
        case CustomersActionTypes.AddCustomer:
            newState.customers.push(action.payload);
            break;
        case CustomersActionTypes.UpdateCustomer:
            const custId=action.payload.id;
            const cusIndex=newState.customers.findIndex(c=>c.id==custId);
            if(cusIndex>=0)
                    newState.customers[cusIndex]=action.payload;
            break;
        case CustomersActionTypes.DeleteCustomer:
            const id=action.payload; // payload is number
            const index=newState.customers.findIndex(c=>c.id==id);
            if (index>=0)
                    newState.customers.splice(index,1);
            break;
        
    }
    return newState;
}
export const customersStore = createStore(customerReducer); 