export interface IAddedBy{
    name: string;
    email: string;
} 

export interface IBook{
  title:string;
  author:string;
  category:string;
  image:string;
  description:string;
  avgRating:number;
    reviewCount: number;
    addedBy: IAddedBy
};