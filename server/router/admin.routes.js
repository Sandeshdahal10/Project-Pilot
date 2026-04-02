import express from 'express';
import multer from "multer";
import { createStudent, createTeacher, deleteStudent, deleteTeacher, getAllUsers, updateStudent, updateTeacher } from "../controllers/adminController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";
const adminRouter = express.Router();

adminRouter.post("/create-student", isAuthenticated, isAuthorized("Admin"), createStudent);
adminRouter.put("/update-student/:id", isAuthenticated, isAuthorized("Admin"), updateStudent);
adminRouter.delete("/delete-student/:id", isAuthenticated, isAuthorized("Admin"), deleteStudent);
adminRouter.post("/create-teacher", isAuthenticated, isAuthorized("Admin"), createTeacher);
adminRouter.put("/update-teacher/:id", isAuthenticated, isAuthorized("Admin"), updateTeacher);
adminRouter.delete("/delete-teacher/:id", isAuthenticated, isAuthorized("Admin"), deleteTeacher);
adminRouter.get("/users", isAuthenticated, isAuthorized("Admin"), getAllUsers);

export default adminRouter;