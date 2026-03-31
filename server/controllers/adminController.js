import { asyncHandler } from "../middlewares/asyncHandler.js";
import { Errorhandler } from "../middlewares/error.js";
import User from "../models/user.js";
import * as userServices from "../services/userServices.js";

export const createStudent = asyncHandler(async (req,res,next) => {
    const {name,email,password,department} = req.body;
    if(!name || !email || !password || !department){
        return next(new Errorhandler("Please provide all required fields",400));
    }
    // Here you  add logic to create a student in the database
    const user = await userServices.createUser({
        name,
        email,
        password,
        department,
        role: "Student",
    });
    res.status(201).json({
        success: true,
        message: "Student created successfully",
        user,
    });
});

export const updateStudent = asyncHandler(async (req,res,next) => {
    const {id} = req.params;
    const updateData = {...req.body};
    delete updateData.role; // Prevent role from being updated

    const user = await userServices.updateUser(id, updateData);
    if(!user){
        return next(new Errorhandler("Student not found",404));
    }
    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        user,
    });
})

