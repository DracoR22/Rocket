'use client'

import Image from "next/image"
import { Button } from "../ui/button"
import { useTransition } from "react"
import { POINTS_TO_REFILL } from "@/constants/contants"
import { refillHearts } from "@/server/actions/user-progress"
import { toast } from "sonner"
import { createStripeUrl } from "@/server/actions/user-subscription"

type Props = {
    hearts: number
    points: number
    hasActiveSubscription: boolean
}

const Items = ({ hasActiveSubscription, hearts, points }: Props) => {

  const [pending, startTransition] = useTransition()

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
        return
    }

    startTransition(() => {
       refillHearts().catch(() => toast.error('Something went wrong. Please try again later'))
    })
  }

  const onUpgrade = () => {
    startTransition(() => {
        createStripeUrl()
        .then((response) => {
            if (response.data) {
                window.location.href = response.data
            }
        })
        .catch(() => toast.error('Something went wrong!'))
    })
  }

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
         <Image src={'/heart.svg'} alt="Heart" height={60} width={60}/>
         <div className="flex-1">
           <p className="text-neutral-700 dark:text-neutral-300 text-base lg:text-xl font-bold">
             Refill hearts
           </p>
         </div>
         <Button onClick={onRefillHearts} disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}>
            {hearts === 5 ? 'full' : (
                <div className="flex items-center">
                   <Image src={'/points-svg'} alt="Points" height={20} width={20}/>
                   <p>
                    {POINTS_TO_REFILL}
                   </p>
                </div>
            )}
         </Button>
      </div>
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
          <Image src={'/unlimited.svg'} alt="Unlimited" height={60} width={60}/>
          <div className="flex-1">
            <p className="text-neutral-700 dark:text-neutral-300 text-base lg:text-xl font-bold">
                Unlimited hearts
            </p>
          </div>
          <Button disabled={pending} onClick={onUpgrade}>
            {hasActiveSubscription ? 'settings' : 'upgrade'}
          </Button>
      </div>
    </ul>
  )
}

export default Items
