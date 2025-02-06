import LecturePlan from "@/components/lecturePlan";
import { title } from "@/components/primitives";
import { getLectures } from "@/app/data/getLectures";

const LecturePlanPage = async () => {
const lectures = await getLectures();
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title({color: "blue"})}>Lecture Plan</h1>
            </div>
            <LecturePlan lectures={lectures}/>
        </section>
    );
};

export default LecturePlanPage;