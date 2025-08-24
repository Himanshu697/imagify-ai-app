import { useContext } from "react";
import { AppContext, AppContextType } from "@/context/AppContext";

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppContextProvider");
  return ctx as AppContextType;
};
