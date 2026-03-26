import connectDB from "./config/db.js";
import app from "./app.js";

//Database Connection
connectDB();

//server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

// Error handling
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});


