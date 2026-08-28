"use client";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      suppressHydrationWarning
      className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-white dark:bg-white/5 text-[var(--text-dark)] dark:text-white/80 hover:bg-[var(--off-white)] dark:hover:bg-white/10 hover:text-[var(--text-dark)] dark:hover:text-white transition-colors"
      title={mounted ? (theme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
    >
      {/* Render neutral placeholder until mounted to avoid hydration mismatch */}
      {!mounted ? (
        <span className="h-[18px] w-[18px] block" aria-hidden />
      ) : theme === "dark" ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-[18px] w-[18px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-[18px] w-[18px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
    </button>
  );
}
