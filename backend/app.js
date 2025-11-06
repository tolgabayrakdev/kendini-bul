import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import testRoutes from "./routes/testRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/tests", testRoutes);
app.use("/api/results", resultRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Testio API is running" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});