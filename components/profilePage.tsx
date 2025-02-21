"use client";
import React, { useState } from "react";
import { User, Course } from "@prisma/client";
import { motion } from "framer-motion";
import { title, subtitle } from "./primitives";
import { Image, Button, ScrollShadow } from "@heroui/react";

const ProfilePage = ({
  user,
  courses,
  allCourses,
}: {
  user: User;
  courses: Course[];
  allCourses: Course[];
}) => {
  const [pendingEnrollments, setPendingEnrollments] = useState<number[]>([]);
  const [pendingRemovals, setPendingRemovals] = useState<number[]>([]);

  const handleToggleEnrollment = (courseId: number, isEnrolled: boolean) => {
    if (isEnrolled) {
      setPendingRemovals((prev) => [...prev, courseId]);
      setPendingEnrollments((prev) => prev.filter((id) => id !== courseId));
    } else {
      setPendingEnrollments((prev) => [...prev, courseId]);
      setPendingRemovals((prev) => prev.filter((id) => id !== courseId));
    }
  };

  const cancelChanges = () => {
    setPendingEnrollments([]);
    setPendingRemovals([]);
  };

  const saveChanges = async () => {
    try {
      console.log("Saving changes:", {
        userId: user.id,
        enroll: pendingEnrollments,
        remove: pendingRemovals,
      });

      const response = await fetch("/api/enrollment/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          enroll: pendingEnrollments,
          remove: pendingRemovals,
        }),
      });

      const textResponse = await response.text();
      console.log("Raw Response:", textResponse);

      const data = JSON.parse(textResponse);

      if (!response.ok) {
        throw new Error(data.error || "Failed to save changes");
      }

      alert("Changes saved!");
      window.location.reload();
    } catch (error) {
      console.error("Save Changes Error:", error);
      if (error instanceof Error) {
        alert(error.message || "Failed to save enrollments.");
      } else {
        alert("Failed to save enrollments.");
      }
    }
  };

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
            {courses
              .filter((course) => !pendingRemovals.includes(course.id))
              .concat(
                allCourses.filter((course) =>
                  pendingEnrollments.includes(course.id)
                )
              )
              .map((course) => (
                <li key={course.id}>
                  <Button
                    isIconOnly
                    variant="ghost"
                    radius="sm"
                    color="danger"
                    size="sm"
                    onPress={() => handleToggleEnrollment(course.id, true)}
                  >
                    X
                  </Button>{" "}
                  {course.courseCode} {course.name}
                </li>
              ))}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className={`${subtitle()} pb-2 text-center`}>
            Sign up to new classes
          </h1>
          <ScrollShadow className="w-[300px] h-[300px]">
            {allCourses
              .filter(
                (course) =>
                  (!courses.some((c) => c.id === course.id) ||
                    pendingRemovals.includes(course.id)) &&
                  !pendingEnrollments.includes(course.id)
              )
              .map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 border-b"
                >
                  <div>
                    <h2>{course.courseCode}</h2>
                    <p>{course.name}</p>
                  </div>
                  <Button
                    onPress={() => handleToggleEnrollment(course.id, false)}
                  >
                    Sign up
                  </Button>
                </div>
              ))}
          </ScrollShadow>
        </div>

        <div className="flex gap-4">
          <Button
            color="secondary"
            onPress={cancelChanges}
            isDisabled={
              pendingEnrollments.length === 0 && pendingRemovals.length === 0
            }
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={saveChanges}
            isDisabled={
              pendingEnrollments.length === 0 && pendingRemovals.length === 0
            }
          >
            Save Changes
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
