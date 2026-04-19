import {Project} from "../models/project.js";
export const getProjectByStudent = async (studentId) => {
    return await Project.findOne({student: studentId}).sort({createdAt: -1});
}