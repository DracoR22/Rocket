import FeedWrapper from "@/components/wrappers/feed-wrapper"
import StickyWrapper from "@/components/wrappers/sticky-wrapper"
import Header from "../../../components/learn/header"
import UserProgress from "@/components/global/user-progress"
import { getUserProgress } from "@/server/db/queries"
import { redirect } from "next/navigation"

const LearnPage = async () => {

  const userProgressData = getUserProgress()

  const [userProgress] = await Promise.all([userProgressData])

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress activeCourse={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={false}/>
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title}/>
      </FeedWrapper>
    </div>
  )
}

export default LearnPage
