import "server-only";

import { Exercise } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { minutesToSeconds } from "date-fns";

export const getCourseExercises = async (courseCode: string): Promise<Exercise[]> => {
  const exercises = await db.exercise.findMany({
    where: {
      courseCode,
    },
  });
  return exercises;
};

