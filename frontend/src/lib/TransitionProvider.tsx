"use client";
import { AnimatePresence } from "framer-motion";
import React from "react";

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
