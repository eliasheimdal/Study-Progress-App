"use client";

import React from "react";
import LectureTracker from "@/components/lectureTracker";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
    
      <LectureTracker />
    </motion.div>
  );
}