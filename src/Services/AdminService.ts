import axios from "axios";
import Customer from "../Models/Customer";
import Company from "../Models/Company";
import { addCus, deleteCustomer, featchCustomers, customersStore, updateCustomer } from "../store/CustomersStore";
import {companiessStore,addComp, fetchCompanies } from "../store/CompaniesState";

class AdminService {
	public async getAllCustomers(){
        if(customersStore.getState().customers.length==0){
        const response=await axios.get<Customer[]>('http://localhost:8080/admin/getAllCustomers');
        customersStore.dispatch(featchCustomers(response.data))    
        return response.data;
        }
        return customersStore.getState().customers;
    }
    public async addCompany(company:Company){
        const response=((await axios.post<Company>('http://localhost:8080/admin/addCompany',company)).data);
        companiessStore.dispatch(addComp(response));
        return response;

    }
    public async getAllCompanies(){
        if(companiessStore.getState().companies.length==0){
        const response=await axios.get<Company[]>('http://localhost:8080/admin/getAllCompanies');
        companiessStore.dispatch(fetchCompanies(response.data)) 
        return response.data;
        }
        return companiessStore.getState().companies;
    }
    public async getOneCustomer(customerId:number):Promise <Customer>{
        const cust=customersStore.getState().customers.find(c=>c.id==customerId);
        if(cust==undefined)
                throw Error("customer not found!");
        else
                return cust;        
    }
    public async getOneCompany(companyId:number):Promise<Company>{
        const comp=companiessStore.getState().companies.find(c=>c.id==companyId);
        if (comp==undefined){
            throw Error("Company not found!")
        }
        else
                return  comp;
    }
}
const adminService=new AdminService();
export default adminService;
