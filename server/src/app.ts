import * as express from "express";
import * as cors from "cors";
import helmet from "helmet";
import * as morgan from "morgan";
import { createServer } from "http";
import * as dotenv from "dotenv";

import connectDB from "./config/db";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import socketService from "./services/socketService";
import botService from "./services/botService";

dotenv.config();

const app = express();
const httpServer = createServer(app);

connectDB();

socketService.initialize(httpServer);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api", routes);

app.use(errorHandler);

setInterval(() => {
  try {
    botService.checkTasksCompletion().catch((err) => {
      console.error("Error in task completion check (caught promise):", err);
    });
  } catch (err) {
    console.error("Error in task completion check (caught exception):", err);
  }
}, 1000);

export { app, httpServer };
