import express from 'express';
import mongoose from 'mongoose';
// import { DELETE_SUCCESS, ERROR_MESSAGE, INPUT_SUCCESS, STUDENT_NOT_FOUND, UPDATE_MESSAGE } from './constants';
import { Student } from './StudentModel.js';
// import { STATUS_CODES } from 'http-status-code';

const app = express();
app.use(express.json());
const connectDb=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/institutedb');
        console.log("Database is created");
    }catch(error){
        console.log(error);
    }

}

app.post("/student",async (request, response)=>{
    try{
        const reqData= request.body;
        const student = new Student(reqData);
        await student.save();
        response.status(200).send({message: "Student inserted"});
    }
    catch(error){
        response.status(500).send({message:"Something went wrong"});
    }
});


app.get("/student",async (request,response)=>{
    try{
        const students = await Student.find();
        response.send({students:students});
    }catch(error){
        response.send({message:"Something went Wrong"});
    }
});

app.get("/student/:roll",async (request,response)=>{
    try{
        const student= await Student.findOne({roll:request.params.roll});
        if(student==null){
            response.status(404).send({message:"Student not found"});
        }
        else{
        response.send({student:student});
        }
    }catch(error){
        response.send({message:"ERROR_MESSAGE"});
    }
});

app.delete("/student/:roll",async (request,response)=>{
    try{
        await Student.deleteOne({roll:request.params.roll});
        response.send({message:"Student deleted"});
        
    }catch(error){
        response.send({message:"ERROR_MESSAGE"});
    }
});

app.put("/student/:roll", async(request,response)=>{
    try{
        await Student.updateOne({roll:request.params.roll},request.body);
        response.send({message:"UPDATE_MESSAGE"});
    }catch(error){
        response.status(500).send({message:"ERROR_MESSAGE"});
    }
});

app.listen(4900,()=>{
    console.log("Server has started");
    connectDb();
});