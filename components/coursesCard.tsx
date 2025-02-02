import { Card, CardHeader, CardFooter, Image, Button } from "@heroui/react";
import courses from "@/data/courses.json";
import NextLink from "next/link";

export default function CoursesCard() {
  return (
    <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
      {courses.map((course) => (
        <Card isFooterBlurred className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Course material
            </p>
            <h4 className="text-white font-medium text-large">
              {course.courseCode} {course.name}
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={course.src}
          />
          <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
              <p className="text-black text-tiny">MSc in Informatics</p>
              <p className="text-black text-tiny">Software Systems</p>
            </div>
            <Button
              className="text-tiny"
              color="primary"
              radius="full"
              size="sm"
            >
              <NextLink href={`/courses/${course.id}`}>See More</NextLink>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
