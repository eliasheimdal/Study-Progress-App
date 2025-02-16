import { CoursePageProps } from "@/types";
import { notFound } from "next/navigation";
import { getCourseExercises } from "@/app/data/getCourseExercises";
import React from "react";
import { title, subtitle } from "@/components/primitives";
import courses from "@/data/courses.json";
import CourseExercises from "@/components/courseExercises";

const CoursePage = async ({
  params: { courseCode },
}: {
  params: { courseCode: string };
}) => {
  const course = courses.find((course) => course.courseCode === courseCode);

  if (!course) {
    notFound();
  }

  const exercises = await getCourseExercises(course.courseCode);

  return (
    <div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ color: "blue" })}>{course.name}</h1>
        </div>
        <p className="text-center">{course.description}</p>
      </section>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ color: "blue" })}>Excersices</h1>
        </div>
        <CourseExercises exercises={exercises} />
      </section>
    </div>
  );
};

export default CoursePage;
