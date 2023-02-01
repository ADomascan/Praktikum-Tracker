import * as mongodb from "mongodb";

export interface Student {
  lname:string;
  fname:string;
  email:string;
  studId:string;
  subject:"applInf"| "IET"| "mechat"| "other";
  other:string;
  date:Date;
  startDate:Date;
  endDate:Date;
  company:string;
  companyAddress:string;
  compArea:string;
  compTopic:string;
  supervisor:string;
  internshipComplete:boolean;
   _id?: mongodb.ObjectId;
}
