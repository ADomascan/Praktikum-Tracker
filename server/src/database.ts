import * as mongodb from "mongodb";
import { Student } from "./student";

export const collections: {
  students?: mongodb.Collection<Student>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("PreisProjekt");
  await applySchemaValidation(db);

  const studentsCollection = db.collection<Student>("Praktikum_Tracker");
  collections.students = studentsCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      /* required: ["lname", "fname", "email", "studId", "subject", "date", "startDate", "endDate", "company", "companyAddress", "compArea", "compTopic", "supervisor"], */
      additionalProperties: true,
      properties: {
        _id: {},
        lname: {
          bsonType: "string",
          description: "'last name' is required and is a string",
        },
       /*  fname: {
          bsonType: "string",
          description: "'first name' is required and is a string",
        },
        email: {
          bsonType: "string",
          description: "'email' is required and is a string",
          minLength: 5
        },
        studId: {
          bsonType: "long",
          description: "'studId' is required and is a number",
          minLength: 5
        },
        subject: {
          bsonType: "string",
          description: "'subject' is required and is one of 'applInf', 'IET', 'mechat' or 'other'",
          enum: ["applInf", "IET", "mechat", "other"],
        },
        date: {
          bsonType: "date",
          description: "'date' is required and is a date",
        },
        // Home address
        hastreet: {
          bsonType: "string",
          description: "Street and house long",
        },
        hazip: {
          bsonType: "long",
          description: "Zip number of the address",
        },
        hatown: {
          bsonType: "string",
          desciption:"hatown is the town or city of the home address",
        },
        phone: {
          bsonType: "long",
          descrption:"phone is the phone number of the student",
        },
        //Internship
        startDate: {
          bsonType: "date",
          description: "'startDate' is required and is a date",
        },
        endDate: {
          bsonType: "date",
          description: "'endDate' is required and is a date",
        },
        company: {
          bsonType: "string",
          description: "'company' is required and is a string",
        },
        companyAddress: {
          bsonType: "string",
          description: "'companyAddress' is required and is a string",
        },
        compArea: {
          bsonType: "string",
          description: "'compArea' is required and is a string",

        },
        compTopic: {
          bsonType: "string",
          description: "'compTopic' is required and is a string",

        },
        supervisor: {
          bsonType: "string",
          description: "'supervisor' is required and is a string",
        },
        // internship extention
        extensionRequest: {
          bsonType: "bool",
          descrption:"extensionRequest is a optional field if an extension is requested",
        },
        extensionReason: {
          bsonType: "string",
          description:"extensionReason is the justification of the extension",
        },
        endDateNew: {
          bsonType: "date",
          description:"endDateNew is the new defined end date of the internship",
        },
        // credits
        credits: {
          bsonType: "decimal",
          descrption:"credits is the amount of ECTS assigned to the internship",
        },
        contractCopy: {
          bsonType: "bool",
          descrption:"contractCopy marks the submitted copy of the contract between student and the company, value true or false",
        },
        reportPaper: {
          bsonType: "bool",
          descrption:"reportPaper marks the submitted report paper about the internship, value true or false",
        },
        reportCard: {
          bsonType: "bool",
          descrption:"reportCard marks the submitted certificate about the intership, value true or false",
        },
        startDateFact: {
          bsonType: "date",
          descrption:"startDateFact is the factual start date of the internship, might deviate from original request",
        },
        endDateFact: {
          bsonType: "date",
          descrption:"endDateFact is the factual end date of the internship, might deviate from original request or have been extended via the extension request",
        },
        totalWorkDays: {
          bsonType: "decimal",
          descrption:"totalWorkDays is the amout of days worked on the internship",
        },
        // colloquium
        colloquiumTopic: {
          bsonType: "string",
          descrption:"colloquimTopic is the topic of the oral exam on the internship",
        },
        colloquiumGrade: {
          bsonType: "decimal",
          descrption:"colloquimGrade is the grade for the completed internship",
        },
        colloquiumDate: {
          bsonType: "date",
          descrption:"colloquilDate is the date of the oral exam",
        },
        term: {
          bsonType: "string",
          enum: ["blanc", "winter", "summer"],
          descrption:"term descibes winter or summer term of the intership",
        },
        year: {
          bsonType: "int",
          descrption:"year is the year of the internship",
        },
        internshipComplete: {
          bsonType: "bool",
          description: "'internshipComplete' is a boolean and marks the completion of the process",
        }, */
      },
    },
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
    collMod: "Praktikum_Tracker",
    validator: jsonSchema,
  }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === 'NamespaceNotFound') {
      await db.createCollection("Praktikum_Tracker", { validator: jsonSchema });
    }
    console.log(error.errInfo)
  });
}
