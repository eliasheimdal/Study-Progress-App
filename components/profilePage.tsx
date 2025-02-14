'use client';
import React from 'react'
import { User, Course } from '@prisma/client';
import { motion } from 'framer-motion';
import { title, subtitle } from './primitives';
import { Image } from '@heroui/react';

const ProfilePage = ({user, courses}:{user: User, courses: Course[]}) => {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.3 }}
      >
        <div className='flex flex-col items-center justify-center gap-4'>
                <h1 className={`${title({ color: "blue" })} pb-2`}>Profile Page</h1>
                <Image
                    src={user.image ?? '/default-image.png'}
                    alt={user.name ?? 'Default Name'}
                    className="rounded-full w-32 h-32"
                />
                <h2>{user.name}</h2>
                <h3>{user.email}</h3>

                <div className='flex flex-col items-center justify-center gap-4'>
                    <h1 className={`${subtitle()} pb-2 text-center`}>Enrollments:</h1>
                    <ul>
                        {courses.map((course) => (
                            <li key={course.courseCode}>{course.courseCode} {course.name}</li>
                        ))}
                    </ul>
                </div>
        </div>
        </motion.div>
    )
}

export default ProfilePage