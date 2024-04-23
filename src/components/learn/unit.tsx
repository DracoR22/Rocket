import { lessons, units } from "@/server/db/schema"
import UnitBanner from "./unit-banner"

type Props = {
    id: number
    order: number
    title: string
    description: string
    lessons: (typeof lessons.$inferSelect & { completed: boolean })[]
    activeLesson: typeof lessons.$inferSelect & { unit: typeof units.$inferSelect } | undefined
    activeLessonPercentage: number
}

const Unit = ({ activeLesson, activeLessonPercentage, description, id, lessons, order, title }: Props) => {
  return (
    <>
      <UnitBanner title={title} description={description}/>
    </>
  )
}

export default Unit
