import React from "react";
import LectureTracker from "@/components/lectureTracker";

import { getLectures } from "@/app/data/getLectures";
import { getCourses } from "@/app/data/getCourses";

const Home = async () => {
  const lectures = await getLectures();
  const courses = await getCourses();
  return <LectureTracker lectures={lectures} courses={courses} />;
};

export default Home;
