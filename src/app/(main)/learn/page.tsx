import FeedWrapper from "@/components/wrappers/feed-wrapper"
import StickyWrapper from "@/components/wrappers/sticky-wrapper"
import Header from "../../../components/learn/header"
import UserProgress from "@/components/global/user-progress"
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from "@/server/db/queries"
import { redirect } from "next/navigation"
import Unit from "@/components/learn/unit"
import { lessons, units as unitsSchema } from "@/server/db/schema"

const LearnPage = async () => {

  const userProgressData = getUserProgress()
  const courseProgressData = getCourseProgress()
  const lessonPercentageData = getLessonPercentage()
  const unitsData = getUnits()
  const userSubscriptionData = getUserSubscription()

  const [userProgress, units, courseProgress, lessonPercentage, userSubscription] = await Promise.all([userProgressData, unitsData, courseProgressData, lessonPercentageData, userSubscriptionData])

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }

  if (!courseProgress) {
    redirect('/courses')
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress activeCourse={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={!!userSubscription?.isActive}/>
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title}/>
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
             <Unit id ={unit.id} order={unit.order} description={unit.description} title={unit.title} lessons={unit.lessons} activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & { unit: typeof unitsSchema.$inferSelect } | undefined} activeLessonPercentage={lessonPercentage}/>
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}

export default LearnPage
