import express from "express";
import {
  checkRequestsQueries,
  checkRequestsBody,
} from "../middleware/checkTasks.js";
import {
  addTask,
  getTasks,
  updateTask,
  getInsights,
} from "../controllers/taskControllers.js";

const routers = express.Router();

// Desfine All Routes

routers.post("/api/tasks", checkRequestsBody, addTask);
routers.get("/api/tasks/", checkRequestsQueries, getTasks);
routers.patch("/api/tasks/:id", checkRequestsBody, updateTask);
routers.get("/api/insights", getInsights);

export default routers;
