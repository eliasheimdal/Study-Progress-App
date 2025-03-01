"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Checkbox, CheckboxGroup, Button, Card } from "@heroui/react";
import ProgressBar from "@/components/progress";
import SliderLoad from "@/components/slider";
import ActivityForm from "@/components/activityForm";
import { Lecture, Course } from "@prisma/client";
import { title, subtitle } from "@/components/primitives";
import { button as buttonStyles } from "@heroui/theme";
import { Activity } from "@/types";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Buttons } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function LectureTracker({
  lectures,
  courses,
}: {
  lectures: Lecture[];
  courses: Course[];
}) {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [message, setMessage] = useState("");
  const [res, setRes] = useState("");

  const loadData = (key: string, defaultValue: any) => {
    if (typeof window !== "undefined" && userId) {
      return JSON.parse(
        localStorage.getItem(`${key}_${userId}`) || JSON.stringify(defaultValue)
      );
    }
    return defaultValue;
  };

  const [progress, setProgress] = useState(() => loadData("progress", {}));
  const [activities, setActivities] = useState(() =>
    loadData("activities", [])
  );
  const [selected, setSelected] = useState(() => loadData("selected", []));
  const [workload, setWorkload] = useState(9.375);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`selected_${userId}`, JSON.stringify(selected));
      localStorage.setItem(`progress_${userId}`, JSON.stringify(progress));
      localStorage.setItem(`activities_${userId}`, JSON.stringify(activities));
    }
  }, [selected, progress, activities, userId]);

  const calculateProgressPercent = (progress: { [key: string]: number }) => {
    return Object.keys(progress).reduce(
      (acc, courseCode) => {
        acc[courseCode] = (progress[courseCode] / workload) * 100;
        return acc;
      },
      {} as { [key: string]: number }
    );
  };

  const [progressPercent, setProgressPercent] = useState(() =>
    calculateProgressPercent(progress)
  );

  const updateProgress = (time: number, courseCode: string) => {
    setProgress((prev: Record<string, number>) => {
      const updatedProgress: Record<string, number> = {
        ...prev,
        [courseCode]: (prev[courseCode] || 0) + time,
      };

      setProgressPercent((prevPercent: Record<string, number>) => ({
        ...prevPercent,
        [courseCode]: (updatedProgress[courseCode] / workload) * 100,
      }));

      return updatedProgress;
    });
  };

  const handleActivitySubmit = (activity: Activity) => {
    const duration = parseInt(activity.duration, 10);

    setActivities((prev: Activity[]) => {
      if (
        prev.some(
          (act: Activity) =>
            act.course === activity.course && act.duration === activity.duration
        )
      ) {
        return prev;
      }
      return [...prev, activity];
    });

    updateProgress(duration, activity.course);
  };

  const handleActivityDelete = (activity: Activity, index: number) => {
    const duration = parseInt(activity.duration, 10);
    const courseCode = activity.course;

    setProgress((prev: Record<string, number>) => {
      const updatedProgress = {
        ...prev,
        [courseCode]: (prev[courseCode] || 0) - duration,
      };

      setProgressPercent((prevPercent: Record<string, number>) => ({
        ...prevPercent,
        [courseCode]: (updatedProgress[courseCode] / workload) * 100,
      }));

      return updatedProgress;
    });

    setActivities((prev: Activity[]) =>
      prev.filter((_, i: number) => i !== index)
    );
  };

  const handleAiMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await fetch("/api/openai", {
        // App Router API path
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      setRes(data.response || "No response received.");
    } catch (error) {
      console.error("Error calling AI API:", error);
      setRes("Failed to fetch AI response.");
    }

    setMessage("");
  };

  const handleReset = () => {
    setSelected([]);
    setProgress({});
    setProgressPercent({});
    setActivities([]);

    if (userId) {
      localStorage.removeItem(`progress_${userId}`);
      localStorage.removeItem(`activities_${userId}`);
      localStorage.removeItem(`selected_${userId}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {session ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <p>Welcome, {session.user?.name}!</p>
            <p>Talk to your AI Assistent about your progress</p>
            <div className="grid w-1/3 gap-2">
              <Textarea
                value={message}
                onChange={(e) =>
                  setMessage((e.target as HTMLTextAreaElement).value)
                }
                placeholder="Type your message here."
              />
              <Buttons onClick={handleAiMessage}>Send message</Buttons>
            </div>
            {res && <ReactMarkdown>{res}</ReactMarkdown>}
            <h1 className={`${title({ color: "blue" })} pb-2`}>Progress</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-grey pt-4">
              <Card className="w-full p-8 border shadow-lg">
                <CheckboxGroup
                  label="Select Attended Lectures"
                  value={selected}
                  onValueChange={setSelected}
                >
                  {lectures.map((lecture) => (
                    <Checkbox
                      key={lecture.id}
                      value={lecture.id.toString()}
                      onChange={(e) =>
                        updateProgress(
                          e.target.checked
                            ? lecture.durationHours
                            : -lecture.durationHours,
                          lecture.courseCode
                        )
                      }
                    >
                      {`${lecture.courseCode} - ${lecture.type} (${lecture.day} ${lecture.time})`}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </Card>
              <Card className="w-full p-8 border shadow-lg">
                {courses.map((course) => (
                  <ProgressBar
                    key={course.courseCode}
                    name={course.name}
                    code={course.courseCode}
                    value={progressPercent[course.courseCode] || 0}
                    effort={progress[course.courseCode] || 0}
                    full={workload}
                  />
                ))}
              </Card>
              <Card className="w-full p-8 border shadow-lg">
                <ActivityForm
                  courses={courses}
                  activities={activities}
                  setActivities={setActivities}
                  onActivitySubmit={handleActivitySubmit}
                  deleteCourse={handleActivityDelete}
                />
              </Card>
            </div>

            <h2 className={`${subtitle()} text-center`}>Workload</h2>
            <SliderLoad
              onChange={(value: number) => setWorkload((value / 100) * 9.375)}
              name="Prosent Student"
              value={100}
            />

            <div className="flex gap-3">
              <Button
                className={buttonStyles({ color: "danger", radius: "full" })}
                onPress={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <p>Please login to view your progress</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
