import { cache } from "react";
import { db } from "./drizzle";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { challengeProgress, courses, lessons, units, userProgress, userSubscription } from "./schema";
import { progress } from "framer-motion";
import { DAY_IN_MS } from "@/constants/contants";

export const getUserProgress = cache(async () => {
    const { userId } = await auth()

    if (!userId) {
        return null
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    })

    return data
})

export const getUnits = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();
  
    if (!userId || !userProgress?.activeCourseId) {
      return [];
    }
  
    const data = await db.query.units.findMany({
      orderBy: (units, { asc }) => [asc(units.order)],
      where: eq(units.courseId, userProgress.activeCourseId),  
      with: {
        lessons: {
          orderBy: (lessons, { asc }) => [asc(lessons.order)], // populate lessons
          with: {
            challenges: {                                      // populate challenges            
              orderBy: (challenges, { asc }) => [asc(challenges.order)],
              with: {
                challengeProgress: {                           // populate challengesProgress  
                  where: eq(
                    challengeProgress.userId,
                    userId,
                  ),
                },
              },
            },
          },
        },
      },
    });
  
    const normalizedData = data.map((unit) => {                             // Iteramos sobre las units -> unit
  
      const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {     // Iteramos sobre las lessons de cada unit
        if (
          lesson.challenges.length === 0                                    // Si la lección no tiene desafios 
        ) {
          return { ...lesson, completed: false };                           // se considerará como no completada
        }
  
        const allCompletedChallenges = lesson.challenges.every((challenge) => { // Si si tiene desafios iteramos los desafios -> challenge
          return challenge.challengeProgress                                        // debe existir algún progreso registrado 
            && challenge.challengeProgress.length > 0                               // y tener almenos un registro  
            && challenge.challengeProgress.every((progress) => progress.completed); // ademas de tener la prop completed=true
        });                                                                     // every devolverá true si cada challenge tiene prog registrado y con la prop completed
  
        return { ...lesson, completed: allCompletedChallenges }; // Actualización de la estructura de lesson
      });
  
      return { ...unit, lessons: lessonsWithCompletedStatus }; // Actualización de la estructura de unit
    });
  
    return normalizedData;
  
  });
  
  

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany()

    return data
})

export const getCourseById = cache(async (courseId: number) => {
   const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
        units: {
            orderBy: (units, { asc }) => [asc(units.order)],
            with: {
                lessons: {
                    orderBy: (lessons, { asc }) => [asc(lessons.order)]
                }
            }
        }
    }
   })

   return data
})

export const getCourseProgress = cache(async () => {
    const { userId } = await auth()

    const userProgress = await getUserProgress()

    if (!userId || !userProgress?.activeCourseId) {
        return null
    }

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    unit: true,
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId)
                            }
                        }
                    }
                }
            }
        }
    })

    const firstUncompletedLesson = unitsInActiveCourse.flatMap((unit) => unit.lessons).find((lesson) => {
        return lesson.challenges.some((challenge) => {
            return !challenge.challengeProgress || challenge.challengeProgress.length === 0 || challenge.challengeProgress.some((progress) => progress.completed === false)
        })
    })

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id
    }
})

export const getLesson = cache(async (id?: number) => {
    const { userId } = await auth()

    if (!userId) {
        return null
    }

    const courseProgress = await getCourseProgress()

    const lessonId = id || courseProgress?.activeLessonId

    if (!lessonId) {
        return null
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId)
                    }
                }
            }
        }
    })

    if (!data || !data.challenges) {
        return null
    }

    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed = challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress) => progress.completed)

        return { ...challenge, completed }
    })

    return { ...data, challenges: normalizedChallenges }
})

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress()

    if (!courseProgress?.activeLessonId) {
        return 0
    }

    const lesson = await getLesson(courseProgress.activeLessonId)

    if (!lesson) {
        return 0
    }

    const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed)
    
    const percentage = Math.round((completedChallenges.length / lesson.challenges.length) * 100)

    return percentage
})

export const getUserSubscription = cache(async () => {
    const { userId } = await auth()

    if (!userId) return null

    const data = await db.query.userSubscription.findFirst({
        where: eq(userSubscription.userId, userId)
    })

    if (!data) return null

    const isActive = data.stripePriceId && data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

    return {
        ...data,
        isActive: !!isActive
    }
}) 