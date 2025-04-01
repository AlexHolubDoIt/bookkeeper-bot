import { Server } from "socket.io";
import { IBot, ITask } from "../types";

let io: Server;

class SocketService {
  initialize(server: any) {
    io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    return io;
  }

  emitBotCreated(data: { bot: IBot; tasks: ITask[] }) {
    if (io) {
      io.emit("bot:created", data);
    }
  }

  emitTaskCompleted(data: { botId: string; taskId: string }) {
    if (io) {
      io.emit("task:completed", data);
    }
  }

  emitTaskProgress(data: { botId: string; taskId: string; progress: number }) {
    if (io) {
      io.emit("task:progress", data);
    }
  }
}

export default new SocketService();
