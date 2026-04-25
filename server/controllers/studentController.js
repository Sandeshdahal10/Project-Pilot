import { asyncHandler } from "../middlewares/asyncHandler.js";
import { Errorhandler } from "../middlewares/error.js";
import { Project } from "../models/project.js";
import User from "../models/user.js";
import * as userServices from "../services/userServices.js";
import * as projectServices from "../services/projectServices.js";

export const getStudentProject = asyncHandler(async (req, res, next) => {
    const studentId = req.user._id;
    const project = await ProjectService.getProjectByStudent(studentId);

    if(!project){
        return res.status(200).json({
            success: true,
            data: {project: null},
            message: "No project found for the student"
        });
    }
    res.status(200).json({
            success: true,
            data: {project},
        });
});

export const submitProposal = asyncHandler(async (req, res, next) => {
    const {title,description} = req.body;
    const studentId = req.user._id;

    const existingProject = await projectServices.getProjectByStudent(studentId);
    if(existingProject && existingProject.status != "rejected"){
        return next(new Errorhandler("You already have a project proposal in process",400));
    }
    const projectData = {
        student: studentId,
        title,
        description,
    };
    const project = await projectServices.createProject(projectData);
    await User.findByIdAndUpdate(studentId, {project: project._id});
    res.status(201).json({
        success: true,
        data: {project},
        message: "Project proposal submitted successfully"
    });
})