import React from "react";
import First from "@/components/First";
import Second from "@/components/Second";
import Third from "@/components/Third";

const page = () => {
  return (
    <div className="  grid bg-slate-900  place-content-center  p-2 flex-col h-[100vh]">
      <First />
      <Second />
      <Third />
    </div>
  );
};

export default page;
