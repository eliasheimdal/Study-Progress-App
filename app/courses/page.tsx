"use client";

import { title } from "@/components/primitives";
import CoursesCard from "@/components/coursesCard";
import { motion } from "framer-motion";


export default function CoursesPage() {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.3 }}
    >
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Courses</h1>
          
        </div>
      </section>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <CoursesCard />
      </div>
    </motion.div>
  );
}