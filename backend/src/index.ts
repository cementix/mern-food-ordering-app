import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";

// App init
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

// Start server
app.listen(7000, () => {
  console.log("Server started on localhost:7000");
});
