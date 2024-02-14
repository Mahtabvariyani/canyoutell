import React from "react";
import First from "@/components/First";
import Second from "@/components/Second";
import Third from "@/components/Third";
import FirstSe from "@/components/FirstSe";

const page = () => {
  return (
    <div className="  grid bg-slate-900 border-1 border-red-200  place-content-center  p-2 flex-col h-[100vh]">
      <First />
      <FirstSe />
      <Second />
      <Third />
    </div>
  );
};

export default page;
