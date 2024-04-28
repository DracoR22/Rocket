import Quiz from "@/components/lesson/quiz"
import { getLesson, getUserProgress, getUserSubscription } from "@/server/db/queries"
import { redirect } from "next/navigation"

const LessonPage = async () => {

  const lessonData = getLesson()
  const userProgressData = getUserProgress()
  const userSubscriptionData = getUserSubscription()

  const [lesson, userProgress, userSubscription] = await Promise.all([lessonData, userProgressData, userSubscriptionData])

  if (!lesson || !userProgress) {
    redirect('/learn')
  }

  const initalPercentage = lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length * 100

  return (
    <Quiz initialLessonId={lesson.id} initialLessonChallenges={lesson.challenges} initialHearts={userProgress.hearts} initialPercentage={initalPercentage} userSubscription={userSubscription}/>
  )
}

export default LessonPage
