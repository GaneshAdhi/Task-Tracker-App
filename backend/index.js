import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRouters from "./routers/taskRouters.js";
import { initializeDbAndServer } from "./database/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/", taskRouters);

initializeDbAndServer(app, PORT);
