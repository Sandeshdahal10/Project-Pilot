import express from 'express';
import multer from "multer";
import { createStudent, deleteStudent, updateStudent } from "../controllers/adminController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";
const adminRouter = express.Router();

adminRouter.post("/create-student", isAuthenticated, isAuthorized("Admin"), createStudent);
adminRouter.put("/update-student/:id", isAuthenticated, isAuthorized("Admin"), updateStudent);
adminRouter.delete("/delete-student/:id", isAuthenticated, isAuthorized("Admin"), deleteStudent);

export default adminRouter;