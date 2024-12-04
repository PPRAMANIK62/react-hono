import { createContext } from "react";

import { ThemeProviderState } from "@/providers/theme-provider";

export const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
