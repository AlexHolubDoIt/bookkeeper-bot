import { Router } from "express";
import botRoutes from "./botRoutes";
import taskRoutes from "./taskRoutes";

const router = Router();

router.use("/bots", botRoutes);
router.use("/tasks", taskRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running",
  });
});

export default router;
