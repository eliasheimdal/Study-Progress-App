import React from 'react'
import { getUserById } from '@/app/data/getUser'
import { getEnrollments } from '@/app/data/getEnrollments';
import { getCourseById } from '@/app/data/getCourses';
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";
import ProfilePage from '@/components/profilePage';


const page = async() => {
    const session = await getServerSession(authOptions);
    console.log(session);
    const user = await getUserById(session?.user?.id as string)

    const enrollments = await getEnrollments(user?.id as string);
    const courses = (await Promise.all(
        enrollments.map((enrollment) => getCourseById(enrollment.courseId))
    )).filter(course => course !== null);
    
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <ProfilePage user={user} courses={courses} />
    </div>
  )
}

export default page