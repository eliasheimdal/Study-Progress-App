import React from "react";
import LectureTracker from "@/components/lectureTracker";
import { getServerSession } from "next-auth/next";
import { getEnrollments } from "@/app/data/getEnrollments";
import { getLectures, getLectureByCourseId } from "@/app/data/getLectures";
import { authOptions } from "@/auth";
import { getCourses, getCourseById } from "@/app/data/getCourses";
import { getUserById } from "@/app/data/getUser";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const user = await getUserById(session?.user?.id as string);
  const userCourses = await getEnrollments(user?.id as string);
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
  return <LectureTracker lectures={userLectures} courses={uCourses} />;
};

export default Home;
