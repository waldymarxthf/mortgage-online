import React, { createContext, useState } from "react";
import { FIELD } from "~utils/constants-field";

type ActiveField = typeof FIELD.MONTHLY_PAYMENT | typeof FIELD.DEADLINE;

interface ActiveFieldContextType {
  activeField: ActiveField;
  setActiveField: React.Dispatch<React.SetStateAction<ActiveField>>;
}

export const ActiveFieldContext = createContext<ActiveFieldContextType>({
  activeField: FIELD.DEADLINE,
  setActiveField: () => {},
});

export function ActiveFieldFormProvider({ children }: { children: React.ReactNode }) {
  const [activeField, setActiveField] = useState<ActiveField>(FIELD.DEADLINE);

  return (
    <ActiveFieldContext.Provider value={{ activeField, setActiveField }}>
      {children}
    </ActiveFieldContext.Provider>
  );
}
