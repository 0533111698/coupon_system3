import { createStore } from "redux";
import Company from "../Models/Company";
// 1. the state - array of Companies
export class AdminCompaniesState{
    public companies: Company[]=[];
}
// 2. a list of Action Types
export enum CompaniesActionTypes{
    FeatchCompanies, AddCompany, DeleteCompany,UpdateCompany,Logout
}
// 3. wrapper for Action and Value
export interface CompaniesAction{
    type:CompaniesActionTypes,
    payload?:any
}
// 4. helper functions to create above interface instances
export function fetchCompanies(companies:Company[]){
    return{type:CompaniesActionTypes.FeatchCompanies,payload:companies}
}
export function addComp(company:Company){
    return{type:CompaniesActionTypes.AddCompany,payload:company}
}
export function updateCompany(company:Company){
    return{type:CompaniesActionTypes.UpdateCompany,payload:company}
}
export function deleteCompany(id:number){
    return {type:CompaniesActionTypes.DeleteCompany,payload:id}
}
export function logoutCompanies(){
    return{type:CompaniesActionTypes.Logout}
}
// 5. Reducer - the logic for each Action
function companyReducer(currentState=new AdminCompaniesState(),action:CompaniesAction){
    const newState={...currentState};// copy the state to a new instance
    switch(action.type){
        case CompaniesActionTypes.FeatchCompanies:
            newState.companies=action.payload;
            break;
        case CompaniesActionTypes.AddCompany:
            newState.companies.push(action.payload);
            break;
        case CompaniesActionTypes.UpdateCompany:
            const compId=action.payload.id;
            const compIndex=newState.companies.findIndex(c=>c.id==compId);
            if(compIndex>=0)
                    newState.companies[compIndex]=action.payload;
            break;
        case CompaniesActionTypes.DeleteCompany:
            const id=action.payload; // payload is number
            const index=newState.companies.findIndex(c=>c.id==id);
            if (index>=0)
                    newState.companies.splice(index,1);
            break;
        case CompaniesActionTypes.Logout:
            newState.companies=[];
            break;
        
    }
    return newState;
}
export const companiessStore = createStore(companyReducer); 