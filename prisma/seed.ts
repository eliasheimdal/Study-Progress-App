// prisma/seed.ts
import { db } from "@/lib/db";

// Import your JSON data (ensure tsconfig.json has "resolveJsonModule": true)
import coursesData from "@/data/courses.json";
import exercisesData from "@/data/exercises.json";
import lecturesData from "@/data/lectures.json";

async function seed() {
  console.log("🌱 Seeding the database...");

  // Clean up existing data (order matters if there are foreign key relations)
  console.log("Cleaning up existing data...");
  await db.exercise.deleteMany();
  await db.lecture.deleteMany();
  await db.course.deleteMany();

  // Seed Courses
  console.log("Creating courses...");
  for (const course of coursesData) {
    await db.course.create({
      data: {
        id: course.id,
        courseCode: course.courseCode,
        name: course.name,
        description: course.description,
        src: course.src,
      },
    });
  }

  // Seed Exercises
  console.log("Creating exercises...");
  // Each entry in exercisesData groups exercises for a given course (by course code)
  for (const exerciseGroup of exercisesData) {
    const courseCode = exerciseGroup.course;
    for (const exercise of exerciseGroup.content) {
      await db.exercise.create({
        data: {
          id: exercise.id,
          name: exercise.name,
          deadline: new Date(exercise.Deadline), // Convert string to Date
          link: exercise.link,
          done: exercise.done,
          courseCode: courseCode, // Associate with the correct course
        },
      });
    }
  }

  // Seed Lectures
  console.log("Creating lectures...");
  for (const lecture of lecturesData) {
    await db.lecture.create({
      data: {
        id: lecture.id,
        day: lecture.day,
        time: lecture.time,
        type: lecture.type,
        durationHours: lecture.durationHours,
        checked: lecture.checked,
        courseCode: lecture.courseCode, // Associate with the correct course
      },
    });
  }

  console.log("🌱 Database seeding complete.");
}

seed()
  .catch((error) => {
    console.error("Seeding error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
