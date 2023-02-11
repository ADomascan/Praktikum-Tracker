// source https://www.mongodb.com/languages/mean-stack-tutorial

import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const studentRouter = express.Router();
studentRouter.use(express.json());
// the ‘GET /students’ endpoint which will allow us to get all the students in the database.
/* We're using the find() method.
Because we're passing in an empty object—{}—we'll get all the students in the database.
We'll then use the toArray() method to convert the cursor to an array.
Finally, we'll send the array of students to the client.*/
studentRouter.get("/", async (_req, res) => {
   try {
       const students = await collections.students.find({}).toArray();
       res.status(200).send(students);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

// the ‘GET /students/:id’ endpoint which will allow us to get a single employee by ID.
studentRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const student = await collections.students.findOne(query);

        if (student) {
            res.status(200).send(student);
        } else {
            res.status(404).send(`Failed to find a student: ID ${id}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find a student: ID ${req?.params?.id}`);
    }
 });

 // The ‘POST /students’ endpoint will allow us to create a new employee.
 studentRouter.post("/", async (req, res) => {
    try {
        const student = req.body;
        const result = await collections.students.insertOne(student);

        if (result.acknowledged) {
            res.status(201).send(`Created a new student: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new student.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

// The ‘PUT /students/:id’ endpoint will allow us to update an existing employee.
 studentRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const student = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.students.updateOne(query, { $set: student });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a student: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find a student: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a student: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 //  the ‘DELETE /students/:id’ endpoint will allow us to delete an existing employee.
/*  studentRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.students.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an employee: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an employee: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an employee: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 }); */
