import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface IProduct {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  children?: any;
  title?: string;
}
export default function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
}: IProduct) {
  return (
    <>
      <motion.div
        animate={
          isOpen ? { opacity: 0.6, zIndex: 3 } : { opacity: 0, display: "none" }
        }
        initial={{ opacity: 0 }}
        className="fixed top-0 bottom-0 right-0 left-0 h-full w-screen bg-black"
      />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { y: 0, height: "auto" },
              collapsed: { y: "100%", height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className={`border-gray-30 fixed bottom-0 right-0 left-0 z-10 w-full rounded-t-3xl border-2 border-b-0 bg-white shadow-[0px_-8px_20px_-6px_rgba(0,0,0,0.3)]`}
          >
            <div className="px-6 py-2">
              <div className="mt-4 flex justify-between">
                <span className="text-base font-semibold">{title}</span>
                <svg
                  onClick={onClose}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
