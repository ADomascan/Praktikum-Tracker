import * as mongodb from "mongodb";

export interface Student {
  lname: string;
  fname: string;
  email: string;
  studId: string;
  subject: "applInf" | "IET" | "mechat" | "other";
  other: string;
  date: Date;
  // home address
  hastreet: string;
  hazip: number;
  hatown: string;
  phone: number;
  // intership
  startDate: Date;
  endDate: Date;
  company: string;
  companyAddress: string;
  compArea: string;
  compTopic: string;
  supervisor: string;
  // internship extention
  extensionRequest: boolean;
  extensionReason: string;
  endDateNew: Date;
  // credits
  credits: number;
  contractCopy: boolean;
  reportPaper: boolean;
  reportCard: boolean;
  startDateFact: Date;
  endDateFact: Date;
  totalWorkDays: number;
  // colloquium
  colloquiumTopic: string;
  colloquiumGrade: number;
  colloquiumDate: Date;
  term: "blanc" | "winter" | "summer";
  year: number;
  internshipComplete: boolean;
  _id?: mongodb.ObjectId;
}
