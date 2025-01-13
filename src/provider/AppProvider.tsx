import React from "react";
import { ThemeProvider } from "./theme-provider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div>{children}</div>
    </ThemeProvider>
  );
};

export default AppProvider;
