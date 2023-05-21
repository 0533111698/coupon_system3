import Category from "./Category";
import Company from "./Company";

class Coupon {
	id:number;
    company:Company;
    category:Category;
    title:string;
    description:string;
    startDate:Date;
    endDate:Date;
    amount:number;
    price:number;
    imageName:string;
    image: string;
    constructor(id:number,company:Company,category:Category, title:string, description:string, startDate:Date, 
        endDate:Date, amount:number, price:number,imageName:string, image: string){
            this.id=id;
            this.company=company;
            this.category=category;
            this.title=title;
            this.description=description;
            this.startDate=startDate;
            this.endDate=endDate;
            this.amount=amount;
            this.price=price;
            this.imageName=imageName;
            this.image=image;
        }
}

export default Coupon;
