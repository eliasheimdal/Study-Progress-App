"use client";
import React from "react";
import { User, Course } from "@prisma/client";
import { motion } from "framer-motion";
import { title, subtitle } from "./primitives";
import { Image, Button, ScrollShadow } from "@heroui/react";

const handleEnrollment = async (userId: string, courseId: number) => {
    try {
      const response = await fetch("/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to enroll");
      }
  
      alert("Enrollment successful!");
      window.location.reload(); // Refresh the page to show updated enrollments
    } catch (error) {
      console.error(error);
      alert("Enrollment failed.");
    }
  };

  const deleteEnrollment = async (userId: string, courseId: number) => {
    try {
      const response = await fetch("/api/enrollment", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete enrollment");
      }
  
      alert("Enrollment deleted!");
      window.location.reload(); // Refresh the page to show updated enrollments
    } catch (error) {
      console.error(error);
      alert("Failed to delete enrollment");
    }
  }

const ProfilePage = ({
  user,
  courses,
  allCourses
}: {
  user: User;
  courses: Course[];
  allCourses: Course[];
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className={`${title({ color: "blue" })} pb-2`}>Profile Page</h1>
        <Image
          src={user.image ?? "/default-image.png"}
          alt={user.name ?? "Default Name"}
          className="rounded-full w-32 h-32"
        />
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>

        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className={`${subtitle()} pb-2 text-center`}>Enrollments:</h1>
          <ul>
            {courses.map((course) => (
              <li key={course.courseCode}>
                <Button isIconOnly variant="ghost" radius="sm" color="danger" size="sm" onPress={() => deleteEnrollment(user.id, course.id)}>X</Button> {course.courseCode} {course.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className={`${subtitle()} pb-2 text-center`}>
            Sign up to new classes
          </h1>
          <ScrollShadow className="w-[300px] h-[400px]">
            {allCourses
              .filter(
                (course) =>
                  !courses.some((c) => c.courseCode === course.courseCode)
              )
              .map((course) => (
                <div
                  key={course.courseCode}
                  className="flex items-center justify-between p-4 border-b"
                >
                  <div>
                    <h2>{course.courseCode}</h2>
                    <p>{course.name}</p>
                  </div>
                  <Button onPress={() => handleEnrollment(user.id, course.id)}>Sign up</Button>
                </div>
              ))}
          </ScrollShadow>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
