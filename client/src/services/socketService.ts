import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "@/constants";
import {
  BotCreatedEvent,
  TaskCompletedEvent,
  TaskProgressEvent,
} from "@/types";

class SocketService {
  private socket: Socket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private eventHandlers: { [event: string]: ((...args: any[]) => void)[] } = {};
  private isConnecting: boolean = false;

  connect(): void {
    if (this.socket || this.isConnecting) return;

    this.isConnecting = true;
    console.log("Connecting to socket server:", SOCKET_URL);

    try {
      this.socket = io(SOCKET_URL, {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
      });

      this.socket.on("connect", () => {
        console.log("Socket connected, ID:", this.socket?.id);
        this.isConnecting = false;

        if (this.reconnectTimer) {
          clearTimeout(this.reconnectTimer);
          this.reconnectTimer = null;
        }
      });

      this.socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);

        if (
          reason === "io server disconnect" ||
          reason === "io client disconnect"
        ) {
          this.reconnectTimer = setTimeout(() => {
            console.log("Attempting manual reconnection");
            this.connect();
          }, 5000);
        }
      });

      this.socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        this.isConnecting = false;
      });

      this.setupEventListeners();
    } catch (error) {
      console.error("Error setting up socket connection:", error);
      this.isConnecting = false;
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.removeAllListeners("bot:created");
    this.socket.removeAllListeners("task:completed");
    this.socket.removeAllListeners("task:progress");

    Object.keys(this.eventHandlers).forEach((event) => {
      this.eventHandlers[event].forEach((handler) => {
        this.socket?.on(event, handler);
      });
    });
  }

  on<T>(event: string, handler: (data: T) => void): () => void {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }

    this.eventHandlers[event].push(handler);

    if (this.socket) {
      this.socket.on(event, handler);
    }

    return () => {
      this.off(event, handler);
    };
  }

  off(event: string, handler: (...args: any[]) => void): void {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event] = this.eventHandlers[event].filter(
        (h) => h !== handler,
      );
    }

    if (this.socket) {
      this.socket.off(event, handler);
    }
  }

  onBotCreated(handler: (data: BotCreatedEvent) => void): () => void {
    return this.on<BotCreatedEvent>("bot:created", handler);
  }

  onTaskCompleted(handler: (data: TaskCompletedEvent) => void): () => void {
    return this.on<TaskCompletedEvent>("task:completed", handler);
  }

  onTaskProgress(handler: (data: TaskProgressEvent) => void): () => void {
    return this.on<TaskProgressEvent>("task:progress", handler);
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export default new SocketService();
