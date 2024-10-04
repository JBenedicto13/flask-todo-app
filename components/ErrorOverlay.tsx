import React from "react";
import { TypographyH1, TypographyP } from "./typography";

const ErrorOverlay = ({ error }: { error: string }) => {
  return (
    <div className="fixed inset-0 bg-slate-950 bg-opacity-75 flex flex-col justify-center items-center text-white">
      <TypographyH1 text="Error" />
      <TypographyP text={error} />
    </div>
  );
};

export default ErrorOverlay;
