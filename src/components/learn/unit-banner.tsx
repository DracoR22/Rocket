import Link from "next/link"
import { Button } from "../ui/button"
import { NotebookTextIcon } from "lucide-react"

type Props = {
    title: string
    description: string
}

const UnitBanner = ({ description, title }: Props) => {
  return (
    <div className="w-full rounded-xl bg-green-500 p-5 text-white flex items-center justify-between">
       <div className="space-y-2.5">
         <h3 className="text-2xl font-bold">
            {title}
         </h3>
         <p className="text-lg">
            {description}
        </p>
       </div>
       <Link href={'/lesson'}>
         <Button>
            <NotebookTextIcon/>
         </Button>
       </Link>
    </div>
  )
}

export default UnitBanner
