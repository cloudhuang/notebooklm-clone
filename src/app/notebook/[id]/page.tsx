"use client";


import React from "react";
import PanelTitle from "./_components/Title";

const NotebookDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="w-full flex rounded-xl flex-row min-h-[90vh] gap-3">
      <div className="w-1/4 p-2 border bg-gray-100 dark:bg-gray-600 rounded-xl"><PanelTitle title="来源" /></div>
      <div className="w-2/4 p-2 border bg-gray-100 dark:bg-gray-600 rounded-xl"><PanelTitle title="聊天" /></div>
      <div className="w-1/4 p-2 border bg-gray-100 dark:bg-gray-600 rounded-xl"><PanelTitle title="Studio" /></div>
    </div>
  );
};

export default NotebookDetailsPage;
