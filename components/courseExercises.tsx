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
  import { useSession } from "next-auth/react";
  
  export default function CourseExersices({ exercises }: { exercises: Exercise[] }) {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const loadData = ( defaultValue: any) => {
      if (typeof window !== "undefined" && userId) {
        return JSON.parse(
          localStorage.getItem(`completedExercises_${userId}`) || JSON.stringify(defaultValue)
        );
      }
      return defaultValue;
    };
    const [completed, setCompleted] = useState(() => loadData({}));

    useEffect(() => {
      if (userId) {
        localStorage.setItem(`completedExercises_${userId}`, JSON.stringify(completed));
      }
    }, [completed, userId]);

    const handlePress = (contentId: number): void => {
      setCompleted((prev: Record<number, boolean>) => {
        const newState: Record<number, boolean> = {
        ...prev,
        [contentId]: !prev[contentId],
        };
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
        {session ? (
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
        </div>) : (
          <p>Sign in to see your exercises</p>
        )}
        </motion.div>
    );
  }