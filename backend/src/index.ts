import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

// Define port constant to start the server
const PORT = 7000;

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Error connecting to database"));

// App init
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/my/user", myUserRoute);

// Routes
app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}`);
});
