import React, { createContext, useState } from "react";

type ActiveField = "monthlyPayment" | "deadline";

interface ActiveFieldContextType {
  activeField: ActiveField;
  setActiveField: React.Dispatch<React.SetStateAction<ActiveField>>;
}

export const ActiveFieldContext = createContext<ActiveFieldContextType>({
  activeField: "deadline",
  setActiveField: () => {},
});

export function ActiveFieldFormProvider({ children }: { children: React.ReactNode }) {
  const [activeField, setActiveField] = useState<ActiveField>("deadline");

  return (
    <ActiveFieldContext.Provider value={{ activeField, setActiveField }}>
      {children}
    </ActiveFieldContext.Provider>
  );
}
