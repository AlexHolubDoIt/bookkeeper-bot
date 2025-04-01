import { Router } from "express";
import {
  getAllTasks,
  getAvailableTasks,
  createTask,
  getTaskById,
} from "../controllers/taskController";
import { validateCreateTask } from "../middleware/requestValidator";

const router = Router();

router.get("/", getAllTasks);
router.get("/available", getAvailableTasks);
router.post("/", validateCreateTask, createTask);
router.get("/:id", getTaskById);

export default router;
