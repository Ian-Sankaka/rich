"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "info";

// Back-compat shim so existing `const { toast } = useToast()` keeps working
export function useToast() {
  return {
    toast: (message: string, type: ToastType = "info") => {
      if (type === "success") toast.success(message);
      else if (type === "error") toast.error(message);
      else toast.info(message);
    },
  };
}

export { toast };

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 } as React.CSSProperties}
        toastStyle={{
          borderRadius: "4px",
          border: "1px solid #e8ece8",
          boxShadow: "0 16px 40px rgba(26,42,26,0.12)",
          fontSize: "14px",
          fontWeight: 500,
        } as React.CSSProperties}
      />
    </>
  );
}
