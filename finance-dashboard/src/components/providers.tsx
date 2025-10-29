'use client';

import { ThemeProvider } from "next-themes";
import React from "react";
import { ReceiptsProvider } from "@/context/ReceiptsContext";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider
      attribute="class"
      enableColorScheme
      defaultTheme="dark"
      themes={["dark", "light"]}
      value={{
        dark: "dark",
        light: "light",
      }}
    >
      <ReceiptsProvider>{children}</ReceiptsProvider>
    </ThemeProvider>
  );
};

