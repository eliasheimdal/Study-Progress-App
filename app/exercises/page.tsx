import { title } from "@/components/primitives";
import ExerciseCard from "@/components/exerciseCard";
import { getExercises } from "@/app/data/getExercises";
import { getCourses } from "@/app/data/getCourses";
import { getAllData } from "@/app/page";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";


const ExercisePage = async () => {
  const session = await getServerSession(authOptions);
  const { uExercises, userLectures, uCourses } = await getAllData(session);
  return (

      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({color: "blue"})}>Excersices</h1>
        </div>
        <ExerciseCard exercises={uExercises} courses={uCourses}/>
      </section>
  );
}

export default ExercisePage;