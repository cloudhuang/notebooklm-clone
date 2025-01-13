import React from "react";

interface Props {
    notebookId: string;
}

function RightPanel({notebookId}: Props) {
  return <div className="p-2 shadow-sm">right</div>;
}

export default RightPanel;
