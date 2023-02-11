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
      required: ["lname", "fname", "email", "studId", "subject", "date", "startDate", "endDate", "company", "companyAddress", "compArea", "compTopic", "supervisor"],
      additionalProperties: true,
      properties: {
        _id: {},
        lname: {
          bsonType: "string",
          description: "'last name' is required and is a string",
        },
        fname: {
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
        },
        phone: {
          bsonType: "long",
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
        },
        extensionReason: {
          bsonType: "string",
        },
        endDateNew: {
          bsonType: "date",
        },
        // credits
        credits: {
          bsonType: "decimal",
        },
        contractCopy: {
          bsonType: "bool",
        },
        reportPaper: {
          bsonType: "bool",
        },
        reportCard: {
          bsonType: "bool",
        },
        startDateFact: {
          bsonType: "date",
        },
        endDateFact: {
          bsonType: "date",
        },
        totalWorkDays: {
          bsonType: "decimal",
        },
        // colloquium
        colloquiumTopic: {
          bsonType: "string",
        },
        colloquiumGrade: {
          bsonType: "decimal",
        },
        colloquiumDate: {
          bsonType: "date",
        },
        term: {
          bsonType: "string",
          enum: ["blanc", "winter", "summer"],
        },
        year: {
          bsonType: "long",
        },
        internshipComplete: {
          bsonType: "bool",
          description: "'internshipComplete' is required and is a boolean",
        },
      },
    },
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
    collMod: "Praktikum_Tracker",
    validator: jsonSchema
  }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === 'NamespaceNotFound') {
      await db.createCollection("Praktikum_Tracker", { validator: jsonSchema });
    }
  });
}
