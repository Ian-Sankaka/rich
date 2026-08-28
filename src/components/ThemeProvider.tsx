"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
const Ctx = createContext<{ theme: Theme; toggle: () => void; mounted: boolean }>({ theme: "light", toggle: () => {}, mounted: false });

export function useTheme() { return useContext(Ctx); }

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Sync with the blocking script in layout.tsx that already set .dark
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("rich-theme", theme);
  }, [theme, mounted]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return <Ctx.Provider value={{ theme, toggle, mounted }}>{children}</Ctx.Provider>;
}
