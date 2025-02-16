import { title } from "@/components/primitives";
import CoursesCard from "@/components/coursesCard";
import { getCourseById } from "@/app/data/getCourses";
import { getEnrollments } from "@/app/data/getEnrollments";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";

const CoursesPage = async () => {
  const session = await getServerSession(authOptions);
  const enrollment = await getEnrollments(session?.user?.id as string);
  const courses = (
    await Promise.all(
      enrollment.map((enrollment) => getCourseById(enrollment.courseId))
    )
  ).filter((course) => course !== null);

  return (
    <div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Courses</h1>
        </div>
      </section>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <CoursesCard courses={courses} />
      </div>
    </div>
  );
};

export default CoursesPage;
