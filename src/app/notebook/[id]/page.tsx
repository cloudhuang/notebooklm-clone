"use client";

import React from "react";

const NotebookDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <div className="w-full">{id}</div>;
};

export default NotebookDetailsPage;
