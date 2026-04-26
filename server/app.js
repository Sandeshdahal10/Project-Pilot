import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.js";
import authRouter from "./router/user.routes.js";
import adminRouter from "./router/admin.routes.js";
import studentRouter from "./router/student.route.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

const uploadsDir = path.join(__dirname, "uploads");
const tempDir = path.join(__dirname, "temp");

if (!fs.existsSync(uploadsDir))
  (fs.mkdirSync(uploadsDir), { recursive: true });
if (!fs.existsSync(tempDir)) (fs.mkdirSync(tempDir), { recursive: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/student", studentRouter);
app.use(errorMiddleware);

export default app;
