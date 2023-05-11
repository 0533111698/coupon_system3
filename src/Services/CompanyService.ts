import axios from "axios";

class CompanyService {
    
	public async deleteCoupon(couponId:number){
        const response=(await axios.delete("https://localhost:8080/company/"+couponId) ).data;
        return response;
    }
}
const companyService=new CompanyService
export default companyService;
