import { cn } from "@/lib/utils";
import React from "react";

function PanelTitle({ title, className }: { title: string, className?: string }) {
  return <div className={cn(className, "text-foreground text-sm shadow-sm") }>{title}</div>;
}

export default PanelTitle;
