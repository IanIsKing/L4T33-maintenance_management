// nodejs server to run the application
import express from "express";
import dbConnection from "./src/db/db_connection.js";
import dotenv from "dotenv";
import jobRoutes from "./src/routes/jobRoutes.js";

const app = express();

dotenv.config();
dbConnection();

app.use(express.json());
app.use("/api", jobRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
