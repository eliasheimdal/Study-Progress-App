import "server-only";
import { Exercise } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { minutesToSeconds } from "date-fns";


export const getExercises = async (): Promise<Exercise[]> => {
  const exercises = await db.exercise.findMany();
  return exercises;
};
