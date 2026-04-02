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

export const deleteStudent = asyncHandler(async (req,res,next) => {
    const {id} = req.params;
    const user = await userServices.getUserById(id);
    if(!user){
        return next(new Errorhandler("Student not found",404));
    }
    if(user.role !== "Student"){
        return next(new Errorhandler("User is not a student",400));
    }
    await userServices.deleteUser(id);
    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
    });
})

export const createTeacher = asyncHandler(async (req,res,next) => {
    const {name,email,password,department, maxStudents, expertise} = req.body;
    if(!name || !email || !password || !department || !maxStudents || !expertise){
        return next(new Errorhandler("Please provide all required fields",400));
    }
    // Here you  add logic to create a teacher in the database
    const user = await userServices.createUser({
        name,
        email,
        password,
        department,
        maxStudents,
        expertise: Array.isArray(expertise) ? expertise : typeof expertise === "string" && expertise.trim() !== "" ? expertise.split(",").map(s=> s.trim()) : [],
        role: "Teacher",
    });
    res.status(201).json({
        success: true,
        message: "Teacher created successfully",
        user,
    });
});

export const updateTeacher = asyncHandler(async (req,res,next) => {
    const {id} = req.params;
    const updateData = {...req.body};
    delete updateData.role; // Prevent role from being updated

    const user = await userServices.updateUser(id, updateData);
    if(!user){
        return next(new Errorhandler("Teacher not found",404));
    }
    res.status(200).json({
        success: true,
        message: "Teacher updated successfully",
        user,
    });
})

export const deleteTeacher = asyncHandler(async (req,res,next) => {
    const {id} = req.params;
    const user = await userServices.getUserById(id);
    if(!user){
        return next(new Errorhandler("Teacher not found",404));
    }
    if(user.role !== "Teacher"){
        return next(new Errorhandler("User is not a teacher",400));
    }
    await userServices.deleteUser(id);
    res.status(200).json({
        success: true,
        message: "Teacher deleted successfully",
    });
})