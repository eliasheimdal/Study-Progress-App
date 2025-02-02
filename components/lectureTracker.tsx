"use client"

import React, { useState, useEffect } from "react";
import { Checkbox, CheckboxGroup, Button } from "@heroui/react";
import ProgressBar from "@/components/progress";
import SliderLoad from "@/components/slider";
import ActivityForm from "@/components/activityForm";
import lectures from "@/data/lectures.json";
import courses from "@/data/courses.json";
import { title, subtitle } from "@/components/primitives";
import { button as buttonStyles } from "@heroui/theme";
import { Activity } from "@/types";
import { useSession } from "next-auth/react";

export default function LectureTracker() {
  const { data: session } = useSession();

  
  const loadProgress = () => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("progress") || "{}");
    }
    return {};
  };
  
  const loadActivities = () => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("activities") || "[]");
    }
    return [];
  };
  
  
  const [progress, setProgress] = useState(loadProgress);
  const [workload, setWorkload] = useState(9.375);
  
  
  const calculateProgressPercent = (progress: { [key: string]: number }) => {
    return Object.keys(progress).reduce((acc, courseCode) => {
      acc[courseCode] = (progress[courseCode] / workload) * 100;
      return acc;
    }, {} as { [key: string]: number });
  };
  
  
  const [progressPercent, setProgressPercent] = useState(() => calculateProgressPercent(loadProgress()));
  const [activities, setActivities] = useState(loadActivities);
  const [selected, setSelected] = useState<string[]>([]);

  
  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress));
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [progress, activities]);

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
      if (prev.some((act: Activity) => act.course === activity.course && act.duration === activity.duration)) {
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

    setActivities((prev: Activity[]) => prev.filter((_, i: number) => i !== index));
  };

  const handleReset = () => {
    setSelected([]);
    setProgress({});
    setProgressPercent({});
    setActivities([]);
    localStorage.removeItem("progress");
    localStorage.removeItem("activities");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {session ? (
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <p>Welcome, {session.user?.name}!</p>
          <h1 className={`${title({ color: "blue" })} pb-2`}>Progress</h1>

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
                    e.target.checked ? lecture.durationHours : -lecture.durationHours,
                    lecture.courseCode
                  )
                }
              >
                {`${lecture.courseCode} - ${lecture.type} (${lecture.day} ${lecture.time})`}
              </Checkbox>
            ))}
          </CheckboxGroup>

          <ActivityForm
            activities={activities}
            setActivities={setActivities}
            onActivitySubmit={handleActivitySubmit}
            deleteCourse={handleActivityDelete}
          />

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
  );
}
