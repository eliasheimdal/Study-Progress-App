"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { subtitle } from "@/components/primitives";
import { Exercise, Course } from "@prisma/client";
import { motion } from "framer-motion";

interface ExerciseCardProps {
  exercises: Exercise[];
  courses: Course[];
}

export default function ExerciseCard({ exercises, courses }: ExerciseCardProps) {
  const [completed, setCompleted] = useState<{ [key: number]: boolean }>({});

  // Retrieve the "completed" state from localStorage on initial load.
  useEffect(() => {
    const storedCompleted = localStorage.getItem("completedExercises");
    if (storedCompleted) {
      setCompleted(JSON.parse(storedCompleted));
    }
  }, []);

  // Toggle the completion state for a specific exercise.
  const handlePress = (contentId: number): void => {
    setCompleted((prev) => {
      const newState = {
        ...prev,
        [contentId]: !prev[contentId],
      };
      localStorage.setItem("completedExercises", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <div>
        {courses.map((course) => {
          // For each course, filter the exercises that have a matching courseCode.
          const courseExercises = exercises.filter(
            (exercise) => exercise.courseCode === course.courseCode
          );

          return (
            <div key={course.courseCode} className="mb-8">
              {/* Display the course header */}
              <h2 className={subtitle()}>{course.courseCode}</h2>
              
              {/* Display exercises for this course */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-zinc-100/50 pt-4">
                {courseExercises.length > 0 ? (
                  courseExercises.map((exercise) => (
                    <div key={exercise.id} className="max-w-[400px]">
                      <Card
                        isPressable
                        isHoverable={!completed[exercise.id]}
                        className={`w-[400px] mt-4 border shadow-lg transition duration-300 ${
                          completed[exercise.id] ? "bg-green-500 text-black" : ""
                        }`}
                        onPress={() => handlePress(exercise.id)}
                      >
                        <CardHeader className="flex gap-3">
                          <Image
                            alt="heroui logo"
                            height={40}
                            radius="none"
                            src="/NTNU.png"
                            width={30}
                          />
                          <div className="flex flex-col">
                            <p className="text-md text-left">{exercise.name}</p>
                            <p className="text-small text-default-500 text-left">
                              blackboard.no
                            </p>
                          </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                        <p className="text-center">The deadline for submission is:</p>
                        <p className="text-center">{new Date(exercise.deadline).toDateString()}</p>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                          {exercise.link ? (
                            <Link isExternal showAnchorIcon href={exercise.link}>
                              Exercise Description
                            </Link>
                          ) : (
                            <p style={{ color: "red" }}>Not available yet</p>
                          )}
                        </CardFooter>
                      </Card>
                    </div>
                  ))
                ) : (
                  <p>No exercises available for this course.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
