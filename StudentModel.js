import mongoose from "mongoose";
import {Schema} from "mongoose";

const StudentSchema = new Schema({
    roll:Number,
    name:String,
    marks:Number,
    gender:String
});



export const Student=mongoose.model("student", StudentSchema);