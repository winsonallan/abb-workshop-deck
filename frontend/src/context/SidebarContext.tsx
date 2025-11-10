"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type SidebarContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Automatically set default state based on screen size and orientation
  useEffect(() => {
    const checkScreen = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const isNarrow = window.innerWidth < 1024; // treat <1024px as mobile/tablet

      if (isPortrait || isNarrow) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Initial check
    checkScreen();

    // Recheck when the window is resized or orientation changes
    window.addEventListener("resize", checkScreen);
    window.addEventListener("orientationchange", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
      window.removeEventListener("orientationchange", checkScreen);
    };
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
