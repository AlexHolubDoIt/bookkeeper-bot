import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants";
import { Button } from "@/components/common";
import { MainLayout } from "@/components/layout";

export const NotFound: React.FC = () => {
  return (
    <MainLayout>
      <div className="py-16 flex flex-col items-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-medium text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-2">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to={ROUTES.DASHBOARD} className="mt-6">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </MainLayout>
  );
};
