"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { siteURL } from "../../public/js-helpers/globalVariables.js";

const menuItems = [
  {
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    text: "Harga Panel",
    link: "/harga-panel",
  },
  {
    text: "Orders",
    link: "/orders",
  },
  {
    text: "Repairing",
    link: "/repairing",
  },
  {
    text: "Profile",
    link: "/profile",
  },
  {
    text: "Report & Review",
    link: "/report-review",
  },
  {
    text: "Invoice",
    link: "/invoice",
  },
  {
    text: "Logout",
    link: "/logout",
  },
];

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();
  const [showScroll, setShowScroll] = useState(false);

  // Wait until animation finishes before enabling overflow
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => setShowScroll(true), 350); // match transition duration
    } else {
      setShowScroll(false);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <>
      {/* Sidebar Toggle (visible when collapsed) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-[var(--prussian-blue)] text-[var(--floral-white)] hover:bg-[var(--reseda-green)] transition-all duration-300 shadow-md shadow-(color:--reseda-green) cursor-pointer flex"
        >
          <Menu size={22} />
          &nbsp;Show the Menu&nbsp;
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed left-0 w-64 text-[var(--floral-white)] shadow-2xl flex flex-col z-40 md:static h-max rounded-xl shadow-md shadow-(color:--reseda-green)"
            style={{
              maxHeight: "calc(100vh - 4rem)",
              overflowY: "auto",
              marginTop: "2rem",
              marginLeft: "2rem",
              width: "250px",
              minWidth: "250px",
              background: "var(--metallic-blue-gradient)",
            }}
          >
            {/* Collapse Button */}
            <div className="px-4 pt-4 pb-0 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md bg-[var(--prussian-blue-80)] hover:bg-[var(--reseda-green)] text-[var(--floral-white)] transition-all duration-300 cursor-pointer"
                title="Collapse Sidebar"
              >
                <Menu size={22} />
              </button>
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center text-center px-6 pt-2 pb-6">
              <p className="text-md font-bold mb-2 text-[var(--lighter-ecru)]">
                Welcome, [Workshop Name]
              </p>
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--ecru)] shadow-md">
                <Image
                  src="/default-profile.png"
                  alt="Profile Picture"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Menu Section */}
            <motion.nav
              className={`flex flex-col p-4 gap-2 ${
                showScroll ? "overflow-y-auto" : "overflow-hidden"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ flex: 1, minHeight: 0, overflowY: "auto" }}
            >
              {menuItems.map((item) => (
                <button
                  type="button"
                  key={`menu_button_${item.text}`}
                  className="text-left px-4 py-3 rounded-md font-medium tracking-wide transition-all duration-200 hover:bg-[var(--light-reseda-green)] hover:text-[var(--prussian-blue)] cursor-pointer"
                  onClick={() => {
                    window.location.href = `${siteURL}/${item.link}`;
                  }}
                  style={{
                    color:
                      item.text === "Logout"
                        ? "var(--light-prussian-blue)"
                        : "var(--floral-white)",
                  }}
                >
                  {item.text === "Logout" ? (
                    <span className="flex items-center gap-2">
                      Logout <i className="fa-solid fa-right-from-bracket"></i>
                    </span>
                  ) : (
                    item.text
                  )}
                </button>
              ))}
            </motion.nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
