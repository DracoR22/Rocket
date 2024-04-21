import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

type Props = {
    title: string
    id: number
    imageSrc: string
    onClick: (id: number) => void
    disabled?: boolean
    active?: boolean
}

const Card = ({ id, imageSrc, onClick, title, active, disabled }: Props) => {
  return (
    <div onClick={() => onClick(id)} className={cn('h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-6 min-h-[217px] min-w-[200px]',
        disabled && 'pointer-events-none opacity-50'
    )}>
      <div className="min-[24px] w-full flex items-center justofy-end">
        {active && (
            <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
                <CheckIcon className="text-white stroke-[4] h-4 w-4"/>
            </div>
        )}
      </div>
    </div>
  )
}

export default Card
