import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants";
import {
  BotManagement,
  Home,
  NotFound,
  TaskAnalytics,
  Dashboard,
} from "./pages";
import { useSocket } from "@/hooks";

const Router: React.FC = () => {
  useSocket();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.BOT_MANAGEMENT} element={<BotManagement />} />
        <Route path={ROUTES.TASK_ANALYTICS} element={<TaskAnalytics />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
