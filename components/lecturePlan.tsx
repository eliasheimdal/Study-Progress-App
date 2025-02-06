"use client";
import React from "react";
import { Lecture } from "@prisma/client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  CardHeader,
  Image,
} from "@heroui/react";
import { useSession } from "next-auth/react";

const LecturePlan = ({ lectures }: { lectures: Lecture[] }) => {
  const monday = lectures.filter((lecture) => lecture.day === "mandag");
  const tuesday = lectures.filter((lecture) => lecture.day === "tirsdag");
  const wednesday = lectures.filter((lecture) => lecture.day === "onsdag");
  const thursday = lectures.filter((lecture) => lecture.day === "torsdag");
  const friday = lectures.filter((lecture) => lecture.day === "fredag");
  const { data: session } = useSession();

  return (
    <div>
        {session ? (
      <Table aria-label="Example static collection table" className="w-full">
        <TableHeader>
          <TableColumn className="text-center border">Monday</TableColumn>
          <TableColumn className="text-center border">Tuesday</TableColumn>
          <TableColumn className="text-center border">Wedensday</TableColumn>
          <TableColumn className="text-center border">Thursday</TableColumn>
          <TableColumn className="text-center border">Friday</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell className="border">
              {monday ? (
                monday
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((lecture) => (
                    <Card key={lecture.id}>
                      {" "}
                      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">
                          {lecture.courseCode} ({lecture.durationHours} Hours)
                        </p>
                        <small className="text-default-500">
                          {lecture.time}
                        </small>
                        <h4 className="font-bold text-large">{lecture.type}</h4>
                      </CardHeader>
                      <CardBody className="overflow-visible py-2">
                        <Image
                          alt="Card background"
                          className="object-cover rounded-xl"
                          src={lecture.type === "Øving" ? "https://st2.depositphotos.com/2117297/7017/i/450/depositphotos_70174505-stock-photo-creativity-team-working-together.jpg" : "https://media.istockphoto.com/id/1366724877/photo/rear-view-of-mature-teacher-talking-to-his-student-during-lecture-at-university-classroom.jpg?s=612x612&w=0&k=20&c=PYpAFHxiUKX2i1D8w_ElnGsm1B64GBleyF-DfYTLcN0="}
                          width={270}
                        />
                      </CardBody>
                    </Card>
                  ))
              ) : (
                <p>No lectures on this day</p>
              )}
            </TableCell>
            <TableCell className="border">
              {tuesday ? (
                tuesday
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((lecture) => (
                    <Card key={lecture.id}>
                      {" "}
                      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">
                          {lecture.courseCode} ({lecture.durationHours} Hours)
                        </p>
                        <small className="text-default-500">
                          {lecture.time}
                        </small>
                        <h4 className="font-bold text-large">{lecture.type}</h4>
                      </CardHeader>
                      <CardBody className="overflow-visible py-2">
                        <Image
                          alt="Card background"
                          className="object-cover rounded-xl"
                          src={lecture.type === "Øving" ? "https://st2.depositphotos.com/2117297/7017/i/450/depositphotos_70174505-stock-photo-creativity-team-working-together.jpg" : "https://media.istockphoto.com/id/1366724877/photo/rear-view-of-mature-teacher-talking-to-his-student-during-lecture-at-university-classroom.jpg?s=612x612&w=0&k=20&c=PYpAFHxiUKX2i1D8w_ElnGsm1B64GBleyF-DfYTLcN0="}
                          width={270}
                        />
                      </CardBody>
                    </Card>
                  ))
              ) : (
                <p>No lectures on this day</p>
              )}
            </TableCell>
            <TableCell className="border">
              {wednesday ? (
                wednesday
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((lecture) => (
                    <Card key={lecture.id}>
                      {" "}
                      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">
                          Daily Mix
                        </p>
                        <small className="text-default-500">12 Tracks</small>
                        <h4 className="font-bold text-large">Frontend Radio</h4>
                      </CardHeader>
                      <CardBody className="overflow-visible py-2">
                        <Image
                          alt="Card background"
                          className="object-cover rounded-xl"
                          src={lecture.type === "Øving" ? "https://st2.depositphotos.com/2117297/7017/i/450/depositphotos_70174505-stock-photo-creativity-team-working-together.jpg" : "https://media.istockphoto.com/id/1366724877/photo/rear-view-of-mature-teacher-talking-to-his-student-during-lecture-at-university-classroom.jpg?s=612x612&w=0&k=20&c=PYpAFHxiUKX2i1D8w_ElnGsm1B64GBleyF-DfYTLcN0="}
                          width={270}
                        />
                      </CardBody>
                    </Card>
                  ))
              ) : (
                <Card>No lectures on this day</Card>
              )}
            </TableCell>
            <TableCell className="border">
                {thursday ? (
                    thursday
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((lecture) => (
                        <Card key={lecture.id}>
                        {" "}
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold">
                            {lecture.courseCode} ({lecture.durationHours} Hours)
                            </p>
                            <small className="text-default-500">{lecture.time}</small>
                            <h4 className="font-bold text-large">{lecture.type}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={lecture.type === "Øving" ? "https://st2.depositphotos.com/2117297/7017/i/450/depositphotos_70174505-stock-photo-creativity-team-working-together.jpg" : "https://media.istockphoto.com/id/1366724877/photo/rear-view-of-mature-teacher-talking-to-his-student-during-lecture-at-university-classroom.jpg?s=612x612&w=0&k=20&c=PYpAFHxiUKX2i1D8w_ElnGsm1B64GBleyF-DfYTLcN0="}
                            width={270}
                            />
                        </CardBody>
                        </Card>
                    ))
                ) : (
                    <Card>No lectures on this day</Card>
                )}
            </TableCell>
            <TableCell className="border">
                {friday ? (
                    friday
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((lecture) => (
                        <Card key={lecture.id}>
                        {" "}
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold">
                            {lecture.courseCode} ({lecture.durationHours} Hours)
                            </p>
                            <small className="text-default-500">{lecture.time}</small>
                            <h4 className="font-bold text-large">{lecture.type}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={lecture.type === "Øving" ? "https://st2.depositphotos.com/2117297/7017/i/450/depositphotos_70174505-stock-photo-creativity-team-working-together.jpg" : "https://media.istockphoto.com/id/1366724877/photo/rear-view-of-mature-teacher-talking-to-his-student-during-lecture-at-university-classroom.jpg?s=612x612&w=0&k=20&c=PYpAFHxiUKX2i1D8w_ElnGsm1B64GBleyF-DfYTLcN0="}
                            width={270}
                            />
                        </CardBody>
                        </Card>
                    ))
                ) : (
                    <Card>No lectures on this day</Card>
                )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>) : (
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <p>Please sign in to view your lectures</p>
        </div>
      )}
    </div>
  );
};

export default LecturePlan;
