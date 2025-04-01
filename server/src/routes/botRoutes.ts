import { Router } from "express";
import {
  createBot,
  getAllBots,
  getBotById,
  getBotTasks,
  deleteBot,
} from "../controllers/botController";
import { validateCreateBot } from "../middleware/requestValidator";

const router = Router();

router.post("/", validateCreateBot, createBot);
router.get("/", getAllBots);
router.get("/:id", getBotById);
router.get("/:id/tasks", getBotTasks);
router.delete("/:id", deleteBot);

export default router;
