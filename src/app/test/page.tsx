"use client";

import { Button } from "@/components/ui/button";
import { summarizePdf } from "@/lib/model";
import React, { useState } from "react";
const page = () => {
  const [summary, setSummary] = useState("");
  async function handleClick() {
    const resp = await summarizePdf(
      "/Users/lipinghuang/Desktop/sandbox/open-notebooklm/uploads/科技助力保险行业数字化转型_基于底层技术与具体运用分析.pdf",
    );
    setSummary(resp);
  }
  return (
    <div>
      <Button onClick={handleClick}>Button</Button>

      <div className="rounded-lg border p-2">{summary}</div>
    </div>
  );
};

export default page;
