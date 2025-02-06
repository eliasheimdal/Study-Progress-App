"use client";
import React, { useState } from "react";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useSession } from "next-auth/react";

const LecturePlan = ({ lectures }: { lectures: Lecture[] }) => {
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();

  const days = ["mandag", "tirsdag", "onsdag", "torsdag", "fredag"];
  const sortedLectures = (day: string) =>
    lectures
      .filter((lecture) => lecture.day === day)
      .sort((a, b) => a.time.localeCompare(b.time));

  const openModal = (lecture: Lecture) => {
    setSelectedLecture(lecture);
    onOpen();
  };

  return (
    <div>
      {session ? (
        <Table aria-label="Lecture Schedule" className="w-full">
          <TableHeader>
            {days.map((day) => (
              <TableColumn key={day} className="text-center border capitalize">
                {day}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              {days.map((day) => (
                <TableCell key={day} className="border">
                  {sortedLectures(day).length > 0 ? (
                    sortedLectures(day).map((lecture) => (
                      <Card
                        key={lecture.id}
                        className="border mt-2"
                        isHoverable
                        isPressable
                        onPress={() => openModal(lecture)}
                      >
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                          <p className="text-tiny uppercase font-bold">
                            {lecture.courseCode} ({lecture.durationHours} Hours)
                          </p>
                          <small className="text-default-500">{lecture.time}</small>
                          <h4 className="font-bold text-large">{lecture.type}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                          <Image
                            alt="Lecture Image"
                            className="object-cover rounded-xl"
                            src={
                              lecture.type === "Øving"
                                ? "https://st2.depositphotos.com/2117297/7017/i/450/depositphotos_70174505-stock-photo-creativity-team-working-together.jpg"
                                : "https://media.istockphoto.com/id/1366724877/photo/rear-view-of-mature-teacher-talking-to-his-student-during-lecture-at-university-classroom.jpg?s=612x612&w=0&k=20&c=PYpAFHxiUKX2i1D8w_ElnGsm1B64GBleyF-DfYTLcN0="
                            }
                            width={270}
                          />
                        </CardBody>
                      </Card>
                    ))
                  ) : (
                    <Card isHoverable className="p-12 border">No lectures on this day</Card>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <p>Please sign in to view your lectures</p>
        </div>
      )}

      <Modal isDismissable isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                {selectedLecture?.courseCode || "Lecture Details"}
              </ModalHeader>
              <ModalBody>
                {selectedLecture ? (
                  <div className="text-center">
                    <p className="mb-2"><strong>Type:</strong> {selectedLecture.type}</p>
                    <p className="mb-2"><strong>Time:</strong> {selectedLecture.time}</p>
                    <p className="mb-2"><strong>Duration:</strong> {selectedLecture.durationHours} hours</p>
                    <p><strong>Day:</strong> {selectedLecture.day}</p>
                  </div>
                ) : (
                  <p>No lecture selected</p>
                )}
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LecturePlan;
