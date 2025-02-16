import React from "react";
import LectureTracker from "@/components/lectureTracker";
import { getServerSession } from "next-auth/next";
import { getEnrollments } from "@/app/data/getEnrollments";
import { getLectureByCourseId } from "@/app/data/getLectures";
import { authOptions } from "@/auth";
import { getCourseById } from "@/app/data/getCourses";
import { getUserById } from "@/app/data/getUser";
import { getExercises } from "@/app/data/getExercises";

export const getAllData = async (session: any) => {
  const user = await getUserById(session?.user?.id as string);
  const userCourses = await getEnrollments(user?.id as string);
  const exercises = await getExercises();
  const userLectures = (
    await Promise.all(
      userCourses.map((enrollment) => getLectureByCourseId(enrollment.courseId))
    )
  )
    .flat()
    .filter((lecture) => lecture !== null);
  const uCourses = (
    await Promise.all(
      userCourses.map((enrollment) => getCourseById(enrollment.courseId))
    )
  )
    .flat()
    .filter((course) => course !== null);
  const uExercises = exercises.filter((exercise) =>
    uCourses.some((course) => course.courseCode === exercise.courseCode)
  );
  return { uExercises, userLectures, uCourses };
}

const Home = async () => {
  const session = await getServerSession(authOptions);
  const { uExercises, userLectures, uCourses } = await getAllData(session);
  return <LectureTracker lectures={userLectures} courses={uCourses} />;
};

export default Home;
