
import { title } from "@/components/primitives";
import CoursesCard from "@/components/coursesCard";
import { getCourses } from "@/app/data/getCourses";


export const CoursesPage = async () => {
  const courses = await getCourses();

  return (
<div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Courses</h1>
          
        </div>
      </section>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <CoursesCard courses={courses}/>
      </div>
      </div>
  );
}

export default CoursesPage;