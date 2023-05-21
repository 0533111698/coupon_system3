import axios from "axios";
import Customer from "../Models/Customer";
import Company from "../Models/Company";
import { addCus, deleteCustomer, featchCustomers, customersStore, updateCustomer } from "../store/CustomersStore";
import {companiessStore,addComp, fetchCompanies, deleteCompany, updateCompany } from "../store/CompaniesState";

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
    public async addCustomer(customer:Customer){
        const response=((await axios.post<Customer>('http://localhost:8080/admin/addCustomer',customer)).data);
        customersStore.dispatch(addCus(response));
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
        if(cust===undefined){
                throw Error("customer not found!");
    }
        else
                return cust;        
    }
    public async getOneCompany(companyId:number):Promise<Company>{
        const comp=companiessStore.getState().companies.find(c=>c.id==companyId);
        if (comp===undefined){
            throw Error("Company not found!")
        }
        else
                return  comp;
    }
    public async deleteCompany(companyId:number){
        const response=(await axios.delete("http://localhost:8080/admin/deleteCompany/"+companyId)).data;
        companiessStore.dispatch(deleteCompany(companyId));
        return response;
    }
    public async deleteCustomer(customerId:number){
        const response=(await axios.delete("http://localhost:8080/admin/deleteCustomer/"+customerId)).data
        customersStore.dispatch(deleteCustomer(customerId));
        return response;
    }
    public async updateCompany(company:Company){
        const response = (await axios.put<Company>("http://localhost:8080/admin/updateCompany/", company)).data; // form data will be sent to the server as request body
        companiessStore.dispatch(updateCompany(company));
        return response;
    }
    public async updateCustomer(customer:Customer){
        const response = (await axios.put<Customer>("http://localhost:8080/admin/updateCustomer/", customer)).data; // form data will be sent to the server as request body
        customersStore.dispatch(updateCustomer(customer));
        return response;
    }
}
const adminService=new AdminService();
export default adminService;
