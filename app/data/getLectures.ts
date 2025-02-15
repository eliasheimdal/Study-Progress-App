import "server-only";
import { Lecture } from "@prisma/client";
import { db } from "@/lib/db";


export const getLectures = async (): Promise<Lecture[]> => {
    const lectures = await db.lecture.findMany({
        include: {
        course: true,
        },
    });
    return lectures;
    };

    export const getLectureByCourseId = async (courseId: number): Promise<Lecture[] | null> => {
    if (!courseId) {
        throw new Error("Course ID is undefined. Please pass a valid ID.");
    }
    const lecture = await db.lecture.findMany({
        where: { course: { id: courseId } },
        include: {
        course: true,
        },
    });
    return lecture;
    }   


