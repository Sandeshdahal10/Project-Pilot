import express from 'express';
import multer from "multer";
import { getAvailableSupervisors,getStudentProject,submitProposal,uploadFiles } from "../controllers/studentController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";
const studentRouter = express.Router();

studentRouter.post("/project", isAuthenticated, isAuthorized("Student"), getStudentProject);
studentRouter.post("/proposal", isAuthenticated, isAuthorized("Student"), submitProposal);

studentRouter.post("/upload/:projectId", isAuthenticated, isAuthorized("Student"), 
// upload.array("files",10),
// handleUploadError, 
uploadFiles);

studentRouter.get("/fetch-supervisors", isAuthenticated, isAuthorized("Student"), getAvailableSupervisors);

export default studentRouter;