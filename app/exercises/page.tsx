import { title } from "@/components/primitives";
import ExerciseCard from "@/components/exerciseCard";
import { getExercises } from "@/app/data/getExercises";
import { getCourses } from "@/app/data/getCourses";


const ExercisePage = async () => {
  const exercises = await getExercises();
  const course = await getCourses();
  return (

      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({color: "blue"})}>Excersices</h1>
        </div>
        <ExerciseCard exercises={exercises} courses={course}/>
      </section>
  );
}

export default ExercisePage;