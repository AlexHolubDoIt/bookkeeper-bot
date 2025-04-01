import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.DASHBOARD);
  }, [navigate]);

  return null;
};
