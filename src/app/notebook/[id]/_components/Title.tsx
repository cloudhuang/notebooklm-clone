import React from "react";

function PanelTitle({ title }: { title: string }) {
  return <div className="text-foreground border-b text-sm border-b-gray-300 mb-4 p-2">{title}</div>;
}

export default PanelTitle;
