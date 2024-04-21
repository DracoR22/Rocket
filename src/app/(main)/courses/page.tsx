import List from "@/components/courses/list"
import { getCourses } from "@/server/db/queries"


const CoursesPage = async () => {

  const courses = await getCourses()

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
       <h1 className="text-2xl font-bold text-neutral-700 dark:text-neutral-300">
         Language Courses
       </h1>
       <List courses={courses} activeCourseId={1}/>
    </div>
  )
}

export default CoursesPage
