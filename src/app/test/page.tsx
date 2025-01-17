"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const page = () => {
  const [summary, setSummary] = useState("");

  async function handleClick() {
  }

  function handleAddDocument() {
  }

  return (
    <div>
      <Button onClick={handleClick}>Button</Button>

      <div className="rounded-lg border p-2">{summary}</div>

      <div>
        <Button onClick={handleAddDocument}>Add Document</Button>
      </div>
    </div>
  );
};

export default page;
