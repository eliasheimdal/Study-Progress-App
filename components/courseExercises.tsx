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
  import { motion } from "framer-motion";
  import { Exercise } from "@prisma/client";
  
  export default function CourseExersices({ exercises }: { exercises: Exercise[] }) {
    const [completed, setCompleted] = useState<{ [key: string]: boolean }>({});

      useEffect(() => {
        const storedCompleted = localStorage.getItem("completedExercises");
        if (storedCompleted) {
          setCompleted(JSON.parse(storedCompleted));
        }
      }, []);
  

    const handlePress = (courseIndex: string, contentId: number): void => {
        setCompleted((prev) => {
          const newState = {
            ...prev,
            [contentId]: !prev[contentId],
          };
          localStorage.setItem("completedExercises", JSON.stringify(newState)); // Save immediately
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
        <div className="flex flex-wrap gap-2">
          {exercises.map((exercise, courseIndex) =>
            (
              <Card
                key={exercise.id}
                isPressable
                isHoverable={!completed[exercise.id]}
                className={`w-[400px] border-1 shadow-lg transition duration-300 ${
                  completed[exercise.id]
                    ? "bg-green-500 text-black"
                    : ""
                }`}
                onPress={() => handlePress(String(courseIndex), exercise.id)}
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
                  <p>The deadline for submission is: {exercise.deadline.toDateString()}</p>
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
            ))
          }
        </div>
        </motion.div>
    );
  }