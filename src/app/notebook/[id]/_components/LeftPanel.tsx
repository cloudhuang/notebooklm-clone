import React from "react";

interface Props {
    notebookId: string;
}

function LeftPanel({notebookId}: Props) {
  return <div className="p-2 shadow-sm">left</div>;
}

export default LeftPanel;
