"use client";

import React from "react";
import PanelTitle from "./_components/Title";
import LeftPanel from "./_components/LeftPanel";
import MiddlePanel from "./_components/MiddlePanel";
import RightPanel from "./_components/RightPanel";
import { PanelLeft, PanelRight } from "lucide-react";

const NotebookDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="w-full flex rounded-xl flex-row min-h-[90vh] gap-3">
      <div className="w-1/4 p-2 border  bg-gray-100 dark:bg-gray-600 rounded-xl">
        <div className="flex flex-row p-2 border-b border-b-gray-300 items-center justify-between">
          <PanelTitle title="来源" />
          <PanelLeft size={16} className="hover:cursor-pointer" />
        </div>
        <LeftPanel notebookId={id} />
      </div>
      <div className="w-2/4 p-2 border bg-gray-100 dark:bg-gray-600 rounded-xl">
        <div>
          <PanelTitle title="聊天" className="p-2 border-b border-b-gray-300" />
          <MiddlePanel notebookId={id} />
        </div>
      </div>
      <div className="w-1/4 p-2 border bg-gray-100 dark:bg-gray-600 rounded-xl">
        <div className="flex flex-row p-2 border-b border-b-gray-300 items-center justify-between">
          <PanelTitle title="Studio" />
          <PanelRight size={16} className="hover:cursor-pointer" />
        </div>

        <RightPanel notebookId={id} />
      </div>
    </div>
  );
};

export default NotebookDetailsPage;
