import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"
import { InfinityIcon } from "lucide-react"

type Props = {
    activeCourse: any
    hearts: number
    points: number
    hasActiveSubscription: boolean
}

const UserProgress = ({ activeCourse, hasActiveSubscription, hearts, points }: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
       <Link href={'/courses'}>
          <Button variant={'ghost'}>
            <Image src={activeCourse.imageSrc} alt={activeCourse.title} className="rounded-md border" width={32} height={32}/>
          </Button>
       </Link>

       <Link href={'/shop'}>
         <Button variant={'ghost'} className="text-orange-500">
            <Image src={'/points.svg'} height={28} width={28} alt="Points" className="mr-2"/>
            {points}
         </Button>
       </Link>

       <Link href={'/shop'}>
         <Button variant={'ghost'} className="text-rose-500">
            <Image src={'/heart.svg'} height={22} width={22} alt="Hearts" className="mr-2"/>
            {hasActiveSubscription ? <InfinityIcon className="w-4 h-4 stroke-[3]"/> : hearts}
         </Button>
       </Link>
    </div>
  )
}

export default UserProgress