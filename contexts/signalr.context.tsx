"use client";

import React, { createContext, useContext, useState } from "react";

interface SignalRContextProps {
  currentGroup: string | null;
  setCurrentGroup: (group: string | null) => void;
}

const SignalRContext = createContext<SignalRContextProps | undefined>(
  undefined
);

interface SignalRProviderProps {
  children: React.ReactNode;
}

export const SignalRProvider: React.FC<SignalRProviderProps> = ({
  children,
}) => {
  const [currentGroup, setCurrentGroup] = useState<string | null>(null);

  return (
    <SignalRContext.Provider value={{ currentGroup, setCurrentGroup }}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = (): SignalRContextProps => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error("useSignalR must be used within a SignalRProvider");
  }
  return context;
};
