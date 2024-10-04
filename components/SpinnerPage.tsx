import React from "react";
import { LoadingSpinner } from "./ui/spinner";

const SpinnerPage = () => {
  return (
    <div className="min-h-screen border border-red-700 flex justify-center items-center">
      <LoadingSpinner />
    </div>
  );
};

export default SpinnerPage;
